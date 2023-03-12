import React from 'react';
import {Typography} from "@mui/material";
import "./OrderHistory.css"
import OrderHistoryBox from "./OrderHistoryBox";

const OrderHistory = ({orderHistory}) => {
    const isOrderHistoryNotEmpty = orderHistory.length > 0;
    return (
        <div className="order-history">
            <Typography
                variant="h3">{isOrderHistoryNotEmpty ? "Historia zamówień" : "Historia zamówień jest pusta"}</Typography>
            {isOrderHistoryNotEmpty && <OrderHistoryBox orderHistory={orderHistory}/>}
        </div>
    );
};

export default OrderHistory;