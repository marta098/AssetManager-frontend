import {Box, Typography} from "@mui/material";
import "../../styles/styles.css"
import React, {useContext, useEffect, useState} from "react";
import {generateReport, getAllReports, getReportById} from "../../services/report-service";
import {AuthContext} from "../../contexts/AuthContext";
import ReportItem from "../../components/Reports/ReportItem";
import ReportHeader from "../../components/Reports/ReportHeader";
import {formatDateWithoutTime} from "../../utils/dateUtils";
import {downloadFile} from "../../utils/fileDownloadUtils";
import CustomSnackbar from "../../components/Commons/CustomSnackbar";
import useSnackbar from "../../hooks/useSnackbar";
import {LoadingButton} from "@mui/lab";
import {ReportDateContext} from "../../contexts/ReportDateContext";

const ReportPage = () => {
    const {token} = useContext(AuthContext);
    const {setLastReportTimestamp} = useContext(ReportDateContext);
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, , closeSnackbar, handleError] = useSnackbar();

    useEffect(() => {
        getAllReports(token)
            .then(data => setReports(data));
    }, []);

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        background: "#f5f5f4",
        width: "87%",
        height: 80,
        marginTop: "2%",
        paddingLeft: "2%",
        marginLeft: "5%",
        marginRight: "auto"
    };

    const buttonStyle = {
        padding: 1.5,
        marginLeft: "auto",
        marginRight: "5%",
        height: 50,
        width: 150,
    }

    const getReport = response => {
        getReportById(token, response.id)
            .then(file => {
                let fileName;
                if (response.fromDate) {
                    fileName = `raport ${formatDateWithoutTime(response.fromDate)} - ${formatDateWithoutTime(response.toDate)}`
                } else {
                    fileName = `raport od ${formatDateWithoutTime(response.toDate)}`
                }
                downloadFile(file.data, fileName);
            })
    }

    const handleGeneratingReport = () => {
        setIsLoading(prevState => !prevState);

        generateReport(token)
            .then(addNewReport)
            .then(response => getReport(response))
            .then(() => setLastReportTimestamp(new Date()))
            .catch(handleError)
            .finally(() => setIsLoading(prevState => !prevState));
    }

    const addNewReport = data => {
        setReports(prevReports => [data, ...prevReports]);
        return data;
    }

    let reportItems = reports.map(report => <ReportItem key={report.id} {...report}/>);

    let content;
    if (reportItems.length !== 0) {
        content = (
            <div style={{
                marginTop: "5%",
                marginLeft: "5%",
                marginRight: "5%"
            }}>
                <Typography variant="h5">
                    Historia generowania raportów
                </Typography>
                <Box style={{flexContainer}}>
                    <ReportHeader/>
                    {reportItems}
                </Box>
            </div>
        );
    } else {
        content = <Typography variant="h4" style={{marginTop: "5%", textAlign: "center"}}>
            Brak poprzednich raportów
        </Typography>
    }

    if (!isLoading) {
        buttonStyle.background = "#D40511";
        buttonStyle.color = '#ffffff';
    }

    return (
        <Box style={{width: "100%"}}>
            <Box style={flexContainer} sx={{flexGrow: 1, mr: 3}}>
                <Typography
                    variant="h6"
                    style={{alignSelf: "center", marginRight: "70%"}}>
                    Raport ITAM</Typography>
                <LoadingButton
                    className="navbar-button"
                    style={buttonStyle}
                    align="right"
                    onClick={handleGeneratingReport}
                    loading={isLoading}>
                    Pobierz</LoadingButton>
            </Box>
            {content}
            <CustomSnackbar
                open={snackbar.open}
                type={snackbar.type}
                onClose={closeSnackbar}
                message={snackbar.message}/>
        </Box>
    );
}
export default ReportPage;