import React from 'react';
import {TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {pl} from "date-fns/locale";
import BaseButton from "../../Commons/BaseButton";

const AssetDetailsDateRow = ({header, value, changeValue, onButtonClick, loading}) => {
    return (
        <div className="asset-details-row">
            <div className="asset-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="asset-details-column">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
                    <DatePicker
                        value={value}
                        views={["year", "month", "day"]}
                        onChange={(newValue) => {
                            changeValue(newValue);
                        }}
                        mask=""
                        renderInput={(params) => <TextField className="middle-column-content" {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div style={{justifyContent: "center"}} className="asset-details-column">
                {onButtonClick && <BaseButton text="Aktualizuj" onClick={onButtonClick} loading={loading}/>}
            </div>
        </div>
    );
};

export default AssetDetailsDateRow;