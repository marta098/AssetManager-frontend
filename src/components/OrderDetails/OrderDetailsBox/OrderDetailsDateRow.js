import React from 'react';
import {TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {pl} from "date-fns/locale";

const OrderDetailsDateRow = ({header, value, changeValue, error, minDate}) => {
    return (
        <div className="order-details-row">
            <div className="order-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="order-details-column">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
                    <DatePicker
                        value={value}
                        views={["year", "month", "day"]}
                        minDate={minDate}
                        onChange={(newValue) => {
                            changeValue(newValue);
                        }}
                        mask=""
                        renderInput={(params) => <TextField className="middle-column-content"
                                                            {...params}
                                                            error={error && error !== ""}
                                                            helperText={error}/>}
                    />
                </LocalizationProvider>
            </div>
            <div className="order-details-column"/>
        </div>
    );
};

export default OrderDetailsDateRow;