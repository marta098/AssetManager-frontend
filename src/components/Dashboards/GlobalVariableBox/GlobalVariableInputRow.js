import React from 'react';
import {TextField, Typography} from "@mui/material";
import BaseButton from "../../Commons/BaseButton";

const GlobalVariableInputRow = ({header, value, setValue, onButtonClick, buttonText, loading, isNumeric, error}) => {
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
                           helperText={error}
                           type={isNumeric ? "number" : "text"}
                           InputLabelProps={{
                               shrink: true,
                           }}/>
            </div>
            <div style={{justifyContent: "center"}} className="order-details-column">
                {onButtonClick && <BaseButton text={buttonText} onClick={onButtonClick} loading={loading}/>}
            </div>
        </div>
    );
};

export default GlobalVariableInputRow;