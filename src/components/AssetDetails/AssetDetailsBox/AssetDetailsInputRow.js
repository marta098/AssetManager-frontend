import React from 'react';
import {TextField, Typography} from "@mui/material";

const AssetDetailsInputRow = ({header, value, setValue}) => {
    return (
        <div className="asset-details-row">
            <div className="asset-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="asset-details-column">
                <TextField className="middle-column-content" value={value} onChange={setValue}/>
            </div>
        </div>
    );
};

export default AssetDetailsInputRow;