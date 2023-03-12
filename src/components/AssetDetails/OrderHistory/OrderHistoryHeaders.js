import React from 'react';
import "./OrderHistory.css"
import {Typography} from "@mui/material";

const OrderHistoryHeaders = () => {
    return (
        <div className="order-history-row">
            <div className="order-history-column">
                <Typography variant="h5">Zamówienie utworzone przez</Typography>
            </div>
            <div className="order-history-column">
                <Typography variant="h5">Numer zamówienia</Typography>
            </div>
        </div>
    );
};

export default OrderHistoryHeaders;