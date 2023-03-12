import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {fetchAllUsersOrders} from "../../services/user-service";
import {Box, Typography} from "@mui/material";
import OrderList from "../../components/Orders/OrderList";

const YourOrdersPage = () => {
    const {token, getUser} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchAllUsersOrders(getUser().id, token)
            .then(setOrders)
    }, [])

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        marginLight: 100,
        background: 'rgba(211,216,236,0.43)'
    }

    return (
        <ul className="order-list">
            <Box style={flexContainer} sx={{flexGrow: 1}}>
                <Typography variant="h6" marginLeft={5} marginY={"auto"}>Twoje zamówienia</Typography>
            </Box>
            <OrderList orders={orders}/>
        </ul>
    );
};

export default YourOrdersPage;