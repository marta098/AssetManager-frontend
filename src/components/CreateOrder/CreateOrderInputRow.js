import React from 'react';
import {TextField, Typography} from "@mui/material";

const CreateOrderInputRow = ({header, value, setValue, deliveryType, error}) => {
    let textField;

    if (deliveryType === "PICKUP") {
        textField = <TextField className="middle-column-content" disabled value={""}/>
    } else {
        textField = <TextField className="middle-column-content"
                               value={value}
                               onChange={setValue}
                               error={error && error !== ""}
                               helperText={error}/>
    }

    return (
        <div className="order-details-row">
            <div className="order-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="order-details-column">
                {textField}
            </div>
        </div>
    );
};

export default CreateOrderInputRow;