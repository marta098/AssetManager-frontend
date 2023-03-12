import React from 'react';
import "../Orders/Order.css"
import "../../styles/styles.css"
import {Typography} from "@mui/material";
import BaseButton from "../Commons/BaseButton";
import {getTranslatedStatus} from "../../utils/statusUtils";

const OrderItem = ({id, orderNumber, status, routeChange, deliveryType}) => {
    return (
        <div>
            <li className="asset-item" style={{backgroundColor: 'rgba(215,215,215,0.22)'}}>
                <div className="asset-property">
                    <Typography variant="h6">Numer zamówienia: {orderNumber}</Typography>
                </div>
                <div className="asset-property">
                    <Typography variant="h6">Status: {getTranslatedStatus(status, deliveryType)}</Typography>
                </div>
                <div className="button-details">
                    <BaseButton text="Szczegóły" onClick={() => routeChange(id)}/>
                </div>
            </li>
        </div>
    );
};

export default OrderItem;