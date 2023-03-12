import React from 'react';
import {Typography} from "@mui/material";
import "./SerialNumberDialog.css"

const SerialNumberRow = ({header, value}) => {
    return (
        <div className="serial-number-row">
            <div className="serial-number-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="serial-number-column">
                <Typography className="middle-column-content" variant="h6">{value ? value : "-"}</Typography>
            </div>
        </div>
    );
};

export default SerialNumberRow;