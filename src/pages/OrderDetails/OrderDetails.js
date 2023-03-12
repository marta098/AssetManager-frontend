import React, {useContext, useEffect, useState} from 'react';
import {changeRemark, fetchOrderDetails, updateOrder, updateOrderWithNewAsset} from "../../services/order-service";
import {AuthContext} from "../../contexts/AuthContext";
import {Typography} from "@mui/material";
import "./OrderDetails.css";
import OrderStatusList from "../../components/OrderDetails/Status/OrderStatusList";
import OrderDetailsDhl from "../../components/OrderDetails/OrderDetailsBox/OrderDetailsDhl";
import ChangeHistory from "../../components/OrderDetails/ChangeHistory/ChangeHistory";
import OrderDetailsIt from "../../components/OrderDetails/OrderDetailsBox/OrderDetailsIt";
import CustomSnackbar from "../../components/Commons/CustomSnackbar";
import BaseButton from "../../components/Commons/BaseButton";
import {useHistory} from "react-router-dom";
import {translateDeliveryType} from "../../utils/deliveryTypeUtils";
import {getTranslatedModel} from "../../utils/modelUtils";
import {getTranslatedStatus} from "../../utils/statusUtils";
import {formatDateWithoutTime} from "../../utils/dateUtils";
import {isEmployeeIt} from "../../utils/roleUtils";
import useSnackbar from "../../hooks/useSnackbar";

const OrderDetails = ({orderId}) => {
    const {token, getUser} = useContext(AuthContext);
    const [orderDetails, setOrderDetails] = useState(null);
    const [snackbar, updateSnackbar, closeSnackbar, handleError] = useSnackbar();
    const history = useHistory();

    useEffect(() => {
        fetchOrderDetails(orderId, token)
            .then(setOrderDetails)
            .catch(handleError);
    }, [])

    const handleChangingRemark = (remark) => {
        return changeRemark(orderId, remark, token)
            .then(() => addChangeHistory(remark))
            .then(() => updateSnackbar("Uwagi dodane!"))
            .catch(handleError);
    }

    const handleUpdatingOrder = orderUpdate => {
        return updateOrder(orderId, orderUpdate, token)
            .then(setOrderDetails)
            .then(() => updateSnackbar("Zamówienie zaktualizowane!"))
            .catch(handleError);
    }

    const handleUpdatingOrderWithNewAsset = orderUpdate => {
        return updateOrderWithNewAsset(orderId, orderUpdate, token)
            .then(response => {
                setOrderDetails(response);
                return response;
            })
            .then((response) => {
                updateSnackbar("Zamówienie zaktualizowane!")
                return response;
            })
            .catch(error => {
                handleError(error);
                throw error;
            });
    }

    const addChangeHistory = remark => {
        const changeHistoryItem = {
            timestamp: new Date(),
            status: orderDetails.status,
            remark: remark,
            author: {
                username: getUser().username
            }
        }

        setOrderDetails(prevDetails => ({
            ...prevDetails,
            changeHistory: [...prevDetails.changeHistory, changeHistoryItem]
        }));
    }

    const copyRawText = () => {
        let details = "";
        details += `Zamówienie ${orderDetails.orderNumber}\n`;
        details += `Zamówienie złożone przez: ${orderDetails.requester.username}\n`;
        details += `Numer MPK: ${orderDetails.mpkNumber}\n`;
        details += `Laptop przypisany do: ${orderDetails.receiver.username}\n`;
        details += `Metoda dostawy: ${translateDeliveryType(orderDetails.deliveryType)}\n`;
        details += `Adres wysyłki: ${orderDetails.deliveryAddress}\n`;
        details += `Data odbioru: ${formatDateWithoutTime(orderDetails.pickupDate)}\n`;
        details += `Zadanie przypisane do: ${orderDetails.assignedTo ? orderDetails.assignedTo.username : "-"}\n`;
        details += `Zadanie przypisane przez: ${orderDetails.assignedTo ? orderDetails.assignedBy.username : "-"}\n`;
        details += `CREST code: ${orderDetails.asset ? orderDetails.asset.crestCode : "-"}\n`;
        details += `Numer seryjny: ${orderDetails.asset ? orderDetails.asset.serialNumber : "-"}\n`;
        details += `Model laptopa: ${orderDetails.asset ? getTranslatedModel(orderDetails.asset.model) : "-"}\n`;
        details += `Uwagi: ${orderDetails.remark}\n`;
        details += `Status: ${getTranslatedStatus(orderDetails.status, orderDetails.deliveryType)}`;

        navigator.clipboard.writeText(details)
            .then(() => updateSnackbar("Szczegóły zamówienia skopiowano do schowka"));
    }

    if (orderDetails === null) {
        return null;
    }

    let orderDetailsBox;
    if (isEmployeeIt(getUser())) {
        orderDetailsBox = <OrderDetailsIt {...orderDetails} handleUpdate={handleUpdatingOrder}
                                          handleUpdateNewAsset={handleUpdatingOrderWithNewAsset}/>
    } else {
        orderDetailsBox = <OrderDetailsDhl {...orderDetails} handleChangingRemark={handleChangingRemark}/>;
    }
    return (
        <div className="orderDetailsDiv">
            <Typography variant="h3">Zamówienie {orderDetails.orderNumber}</Typography>
            <OrderStatusList orderStatus={orderDetails.status} deliveryType={orderDetails.deliveryType}/>
            {orderDetailsBox}
            <ChangeHistory  changeHistory={orderDetails.changeHistory} deliveryType={orderDetails.deliveryType}/>
            <CustomSnackbar
                open={snackbar.open}
                type={snackbar.type}
                onClose={closeSnackbar}
                message={snackbar.message}/>
            <div className="footer-div">
                <BaseButton text={"Powrót"} onClick={history.goBack}/>
                {isEmployeeIt(getUser()) && <BaseButton text={"Skopiuj szczegóły"} onClick={copyRawText}/>}
            </div>
        </div>
    );
};

export default OrderDetails;