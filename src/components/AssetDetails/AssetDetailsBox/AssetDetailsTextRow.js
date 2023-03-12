import React from 'react';
import "./AssetDetailsBox.css"
import {Typography} from "@mui/material";

const AssetDetailsTextRow = ({header, value}) => {
    return (
        <div className="asset-details-row">
            <div className="asset-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="asset-details-column">
                <Typography className="middle-column-content" variant="h6">{value}</Typography>
            </div>
            <div className="asset-details-column"/>
        </div>
    );
};

export default AssetDetailsTextRow;