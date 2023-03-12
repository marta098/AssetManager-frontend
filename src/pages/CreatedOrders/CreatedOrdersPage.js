import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import {fetchAllOrdersCreatedByUser} from "../../services/user-service";
import {Box, Typography} from "@mui/material";
import BaseButton from "../../components/Commons/BaseButton";
import OrderList from "../../components/Orders/OrderList";

const CreatedOrdersPage = () => {
    const {token, getUser} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    let history = useHistory();

    useEffect(() => {
        fetchAllOrdersCreatedByUser(getUser().id, token)
            .then(setOrders)
    }, [])

    const redirectToNewOrder = () => {
        history.push(`/main-page/your-orders/create`)
    }

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        marginLight: 100,
        background: 'rgba(211,216,236,0.43)'
    }

    return (
        <ul className="order-list">
            <Box style={flexContainer} sx={{flexGrow: 1}}>
                <Typography variant="h6" marginLeft={5} marginY={"auto"}>Stworzone zamówienia</Typography>
                <Box sx={{ml: "auto"}}>
                    <BaseButton text="Nowe zamówienie" onClick={redirectToNewOrder}/>
                </Box>
            </Box>
            <OrderList orders={orders}/>
        </ul>
    );
};

export default CreatedOrdersPage;