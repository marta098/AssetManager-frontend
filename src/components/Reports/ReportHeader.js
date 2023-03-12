import React from 'react';
import {Typography} from "@mui/material";

const ReportHeader = () => {
    return (
        <div className="employee-item">
            <div className="employee-property">
                <Typography variant="h6">Data pobrania</Typography>
            </div>
            <div className="employee-property">
                <Typography variant="h6">Zakres od</Typography>
            </div>
            <div className="employee-property">
                <Typography variant="h6">Zakres do</Typography>
            </div>
            <div className="employee-property">
                <Typography variant="h6">Wygenerowane przez</Typography>
            </div>
            <div className="employee-property">
            </div>
        </div>
    );
};

export default ReportHeader;