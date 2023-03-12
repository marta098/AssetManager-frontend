import React from 'react';
import {TextField, Typography} from "@mui/material";
import BaseButton from "../../Commons/BaseButton";

const OrderDetailsInputRow = ({header, value, setValue, onButtonClick, buttonText, loading, error}) => {
    return (
        <div className="order-details-row">
            <div className="order-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="order-details-column">
                <TextField className="middle-column-content"
                           value={value != null ? value : ""}
                           onChange={setValue}
                           error={error && error !== ""}
                           helperText={error}/>
            </div>
            <div style={{justifyContent: "center"}} className="order-details-column">
                {onButtonClick && <BaseButton text={buttonText} onClick={onButtonClick} loading={loading}/>}
            </div>
        </div>
    );
};

export default OrderDetailsInputRow;