import React from 'react';
import "./OrderHistory.css"
import OrderHistoryHeaders from "./OrderHistoryHeaders";
import OrderHistoryRow from "./OrderHistoryRows";

const OrderHistoryBox = ({orderHistory}) => {
    const orderHistoryRows = orderHistory
        .map((orderHistory, index) => <OrderHistoryRow key={index} {...orderHistory}/>);

    return (
        <div className="order-history-box">
            <OrderHistoryHeaders/>
            {orderHistoryRows}
        </div>
    );
};

export default OrderHistoryBox;