import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import useInputState from "../../hooks/useInputState";
import {Box, Typography} from "@mui/material";
import OrderDetailsDateRow from "../../components/OrderDetails/OrderDetailsBox/OrderDetailsDateRow";
import BaseButton from "../../components/Commons/BaseButton";
import CreateOrderSelectRow from "../../components/CreateOrder/CreateOrderSelectRow";
import {deliveryTypeMap} from "../../utils/deliveryTypeUtils";
import CreateOrderInputRow from "../../components/CreateOrder/CreateOrderInputRow";
import {fetchAllUsers} from "../../services/user-service";
import CreateOrderSelectSearchRow from "../../components/CreateOrder/CreateOrderSelectSearchRow";
import {fetchAllMpkNumbers} from "../../services/util-service";
import {createOrder} from "../../services/order-service";
import {getModelArray} from "../../utils/modelUtils";
import {getDaysBetweenToday} from "../../utils/dateUtils";
import useSnackbar from "../../hooks/useSnackbar";
import CustomSnackbar from "../../components/Commons/CustomSnackbar";


const CreateOrder = () => {
    const {token} = useContext(AuthContext);
    const [mpks, setMpks] = useState([]);
    const [users, setUsers] = useState([]);
    const [model, setModel, , modelError, setModelError] = useInputState("");
    const [mpkNumber, setMpkNumber, , mpkError, setMpkError] = useInputState("");
    const [deliveryType, setDeliveryType, , deliveryError, setDeliveryError] = useInputState("");
    const [receiver, updateReceiver] = useInputState("");
    const [receiverError, setReceiverError] = useState("");
    const [address, updateAddress, , addressError, setAddressError] = useInputState("");
    const [minDate, updateMinDate] = useState(new Date(new Date().setDate(new Date().getDate() + 8)));
    const [pickupDate, updatePickupDate] = useState(new Date(new Date().setDate(new Date().getDate() + 8)));
    const [pickupDateError, setPickupDateError] = useState("");
    const [remark, updateRemark] = useInputState("");
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, , closeSnackbar, handleError] = useSnackbar();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            let fetchedUsers = await fetchAllUsers(token)
                .catch(handleError);
            let fetchedMpks = await fetchAllMpkNumbers(token)
                .catch(handleError);

            fetchedMpks = fetchedMpks.map(mpk => {
                return {key: mpk.id, value: mpk.mpk}
            });

            fetchedUsers = fetchedUsers.map(user => {
                return {key: user.id, value: user.email}
            });
            setUsers(fetchedUsers);
            setMpks(fetchedMpks);
        }

        fetchData();
    }, [])

    const routeChange = () => {
        history.goBack()
    }

    const handleCreateOrder = e => {
        e.preventDefault();
        if (!isOrderValid()) {
            return;

        }

        setIsLoading(prevState => !prevState);
        const newOrder = {
            receiverEmail: receiver,
            pickupDate: pickupDate,
            remark: remark,
            mpkId: mpkNumber,
            model: model,
            deliveryType: "PICKUP",
            deliveryAddress: address
        };
        createOrder(newOrder, token)
            .then(order => history.push(`/main-page/orders/${order.id}`))
            .finally(() => setIsLoading(prevState => !prevState));
    }

    const isOrderValid = () => {
        resetErrors();

        let isValid = true;
        if (!model) {
            setModelError("Podaj model");
            isValid = false;
        }
        if (!mpkNumber) {
            setMpkError("Podaj numer MPK");
            isValid = false;
        }
        if (!deliveryType) {
            setDeliveryError("Podaj sposób odbioru");
            isValid = false;
        }
        if (deliveryType === "SHIPMENT" && !address) {
            setAddressError("W przypadku wysyłki adres nie może być pusty");
            isValid = false;
        }
        if (!pickupDate || getDaysBetweenToday(pickupDate) >= -6) {
            setPickupDateError("Data odbioru nie może być mniejsza niż 7 dni");
            isValid = false;
        }
        if (!receiver) {
            setReceiverError("Podaj email pracownika")
            isValid = false;
        }

        return isValid;
    }

    const resetErrors = () => {
        setModelError("");
        setMpkError("");
        setDeliveryError("");
        setAddressError("");
        setPickupDateError("");
        setReceiverError("");
    }

    let addressField;
    if (deliveryType === "SHIPMENT") {
        addressField = <CreateOrderInputRow header="Adres wysyłki"
                                            required value={address}
                                            deliveryType={deliveryType}
                                            setValue={updateAddress}
                                            error={addressError}/>
    }

    return (
        <div className="orderDetailsDiv">
            <Typography variant="h4">Stwórz zamówienie</Typography>
            <div className="order-details-box" style={{background: "white"}}>
                <CreateOrderSelectRow header="Model" value={model}
                                      setValue={setModel}
                                      selectValuesMap={getModelArray()}
                                      error={modelError}/>
                <CreateOrderSelectRow header="Numer MPK"
                                      value={mpkNumber}
                                      setValue={setMpkNumber}
                                      selectValuesMap={mpks}
                                      error={mpkError}/>
                <CreateOrderSelectRow header="Odbiór"
                                      value={deliveryType}
                                      setValue={setDeliveryType}
                                      selectValuesMap={deliveryTypeMap}
                                      error={deliveryError}/>
                <CreateOrderSelectRow header="Email odbiorcy urządzenia"
                                      selectValuesMap={users}
                                      value={receiver}
                                      setValue={updateReceiver}
                                      error={receiverError}
                />
                {addressField}
                <OrderDetailsDateRow header="Data odbioru"
                                     minDate={minDate}
                                     value={pickupDate}
                                     changeValue={updatePickupDate}
                                     error={pickupDateError}/>
                <CreateOrderInputRow header="Uwagi zamówienia"
                                     value={remark}
                                     setValue={updateRemark}/>

            </div>
            <Box sx={{alignSelf: "center", marginTop: 20}}>
                <BaseButton text="Powrót" onClick={routeChange}/>
                <BaseButton text="Zamów" onClick={handleCreateOrder} loading={isLoading}/>
            </Box>
            <CustomSnackbar
                open={snackbar.open}
                type={snackbar.type}
                onClose={closeSnackbar}
                message={snackbar.message}/>
        </div>
    );
};

export default CreateOrder;