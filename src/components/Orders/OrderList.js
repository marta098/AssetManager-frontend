import React from 'react';
import OrderItem from "./OrderItem";
import {Typography} from "@mui/material";
import {useHistory} from "react-router-dom";

const OrderList = ({orders}) => {
    let history = useHistory();

    const redirectToOrderDetails = orderId => {
        history.push(`/main-page/orders/${orderId}`)
    }

    const orderItems = orders.map(order => <OrderItem key={order.id}
                                                      routeChange={redirectToOrderDetails}
                                                      {...order}/>)

    if (orders.length === 0) {
        return <Typography variant="h6" marginTop={5} marginX={"auto"}>Brak zamówień</Typography>
    }

    return (
        <div>
            {orderItems}
        </div>
    );
};

export default OrderList;