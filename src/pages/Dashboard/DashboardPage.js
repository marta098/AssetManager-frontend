import React, {useContext, useEffect, useState} from 'react';
import {Box} from "@mui/material";
import AssetChart from "../../components/Dashboards/AssetChart";
import {fetchAssetStatistics, fetchWorkload} from "../../services/dashboard-service";
import {AuthContext} from "../../contexts/AuthContext";
import "../../components/Dashboards/GlobalVariableBox/GlobalVariableBox.css"
import {fetchCrestCodeGlobalVariable, fetchDeprecationGlobalVariable} from "../../services/util-service";
import WorkloadChart from "../../components/Dashboards/WorkloadChart";
import GlobalVariableBox from "../../components/Dashboards/GlobalVariableBox/GlobalVariableBox";
import "./DashboardPage.css"

const DashboardPage = () => {
    const {token} = useContext(AuthContext);
    const [assetStatistics, setAssetStatistics] = useState(null);
    const [workloadData, setWorkloadData] = useState(null);
    const [deprecationGlobalVariable, setDeprecationGlobalVariable] = useState(null);
    const [crestCodeGlobalVariable, setCrestCodeGlobalVariable] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedWorkload = await fetchWorkload(token)
            const fetchedAssetStatistics = await fetchAssetStatistics(token)
            const fetchedDeprecationGlobalVariable = await fetchDeprecationGlobalVariable(token)
            const fetchedCrestCodeGlobalVariable = await fetchCrestCodeGlobalVariable(token)

            setWorkloadData(fetchedWorkload);
            setAssetStatistics(fetchedAssetStatistics);
            setDeprecationGlobalVariable(fetchedDeprecationGlobalVariable);
            setCrestCodeGlobalVariable(fetchedCrestCodeGlobalVariable);
        }
        fetchData();
    }, [])

    return (
        <Box sx={{marginTop: 5}}>
            <div className="dashboards-div">
                {assetStatistics && <AssetChart {...assetStatistics}/>}
                {workloadData && <WorkloadChart workloadData={workloadData}/>}
            </div>
            {(deprecationGlobalVariable && crestCodeGlobalVariable) &&
            <GlobalVariableBox crestCode={crestCodeGlobalVariable} deprecation={deprecationGlobalVariable}/>}
        </Box>
    );
}

export default DashboardPage;