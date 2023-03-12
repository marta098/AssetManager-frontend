import React from 'react';
import {MenuItem, Select, Typography} from "@mui/material";
import BaseButton from "../../Commons/BaseButton";

const AssetDetailsSelectRow = ({header, value, setValue, onButtonClick, selectValuesMap}) => {
    const menuItems = Array.from(selectValuesMap)
        .map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>);

    return (
        <div className="asset-details-row">
            <div className="asset-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="asset-details-column">
                <Select value={value} onChange={setValue} variant="outlined" className="middle-column-content">
                    {menuItems}
                </Select>
            </div>
            <div style={{justifyContent: "center"}} className="asset-details-column">
                {onButtonClick && <BaseButton text="Aktualizuj" onClick={onButtonClick}/>}
            </div>
        </div>
    );
};

export default AssetDetailsSelectRow;