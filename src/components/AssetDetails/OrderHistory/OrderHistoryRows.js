import React from 'react';
import "./OrderHistory.css"
import {Typography} from "@mui/material";

const OrderHistoryRow = ({requester, orderNumber}) => {
    return (
        <div className="order-history-row">
            <div className="order-history-column">
                <Typography variant="h6">{requester.email ? requester.email : "-"}</Typography>
            </div>
            <div className="order-history-column">
                <Typography variant="h6">{orderNumber ? orderNumber : "-"}</Typography>
            </div>
        </div>
    );
};

export default OrderHistoryRow;