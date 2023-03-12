import React, {useContext, useState} from 'react';
import {Typography} from "@mui/material";
import "./Report.css"
import BaseButton from "../Commons/BaseButton";
import {AuthContext} from "../../contexts/AuthContext";
import {getReportById} from "../../services/report-service";
import {formatDateWithoutTime, formatDateWithSeconds} from "../../utils/dateUtils";
import {downloadFile} from "../../utils/fileDownloadUtils";

const ReportItem = ({id, generatedBy, timestamp, fromDate, toDate}) => {
    const {token} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const downloadReport = () => {
        setIsLoading(prevState => !prevState);

        getReportById(token, id)
            .then((response) => {
                let fileName;
                if (fromDate) {
                    fileName = `raport ${formatDateWithoutTime(fromDate)} - ${formatDateWithoutTime(toDate)}`
                } else {
                    fileName = `raport od ${formatDateWithoutTime(toDate)}`
                }
                downloadFile(response.data, fileName);
            })
            .finally(() => setIsLoading(prevState => !prevState));
    }

    return (
        <div>
            <li className="report-item" style={{backgroundColor: 'rgba(215,215,215,0.22)'}}>
                <div className="report-property">
                    <Typography variant="h6">{formatDateWithSeconds(timestamp)}</Typography>
                </div>
                <div className="report-property">
                    <Typography variant="h6">{fromDate ? formatDateWithoutTime(fromDate) : "-"}</Typography>
                </div>
                <div className="report-property">
                    <Typography variant="h6">{formatDateWithoutTime(toDate)}</Typography>
                </div>
                <div className="report-property">
                    <Typography variant="h6">{generatedBy.email}</Typography>
                </div>
                <div className="report-property" style={{justifyContent: "center"}}>
                    <BaseButton text="Pobierz ponownie" onClick={downloadReport} loading={isLoading}/>
                </div>
            </li>
        </div>
    );
};

export default ReportItem;