import React from 'react';
import "../../OrderDetails/ChangeHistory/ChangeHistory.css"
import {Typography} from "@mui/material";

const AssetChangeHistoryHeaders = () => {
    return (
        <div className="change-history-row">
            <div className="change-history-column">
                <Typography variant="h5">Data zmiany</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Właściciel</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Data przypisania</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Data wypisania</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Amortyzacja</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Status</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Uwagi</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h5">Autor</Typography>
            </div>
        </div>
    );
};

export default AssetChangeHistoryHeaders;