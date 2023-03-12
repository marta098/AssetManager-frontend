import React from 'react';
import {isChecked, statuses} from "../../../utils/statusUtils";
import "./OrderStatus.css"
import StatusBox from "./StatusBox";

const OrderStatusList = ({orderStatus, deliveryType}) => {
    const statusBoxes = statuses.map((status, index) =>
        <StatusBox key={index} step={index + 1}
                   status={status}
                   isChecked={isChecked(status, orderStatus)}
                   deliveryType={deliveryType}
        />);
    return (
        <div className="status-list">
            {statusBoxes}
        </div>
    );
};

export default OrderStatusList;