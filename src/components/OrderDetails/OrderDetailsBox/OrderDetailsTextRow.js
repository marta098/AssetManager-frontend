import React from 'react';
import "./OrderDetailsBox.css"
import {Typography} from "@mui/material";
import BaseButton from "../../Commons/BaseButton";

const OrderDetailsTextRow = ({header, value}) => {

    return (
        <div className="order-details-row">
            <div className="order-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="order-details-column">
                <Typography className="middle-column-content" variant="h6">{value ? value : "-"}</Typography>
            </div>
            <div className="order-details-column"/>

        </div>
    );
};

export default OrderDetailsTextRow;