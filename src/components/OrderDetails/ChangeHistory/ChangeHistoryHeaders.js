import React from 'react';
import "./ChangeHistory.css"
import {Typography} from "@mui/material";

const ChangeHistoryHeaders = () => {
    return (
        <div className="change-history-row">
            <div className="change-history-column">
                <Typography variant="h5">Data</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Status</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Treść uwagi</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Autor</Typography>
            </div>
        </div>
    );
};

export default ChangeHistoryHeaders;