import React, {useState} from 'react';
import "./OrderDetailsBox.css"
import OrderDetailsTextRow from "./OrderDetailsTextRow";
import {translateDeliveryType} from "../../../utils/deliveryTypeUtils";
import moment from 'moment'
import OrderDetailsInputRow from "./OrderDetailsInputRow";
import useInputState from "../../../hooks/useInputState";
import {isCompleted} from "../../../utils/statusUtils";
import {getTranslatedModel} from "../../../utils/modelUtils";
import {getUsernameDisplay} from "../../../utils/userUtils";

const OrderDetailsDhl = ({
                             deliveryType, receiver, deliveryAddress, pickupDate, remark, requester,
                             status, handleChangingRemark, requestedModel, mpkNumber, assignedBy, assignedTo
                         }) => {
    const [remarkValue, setRemarkValue, resetRemark, remarkError, setRemarkError] = useInputState("");
    const [isLoading, setIsLoading] = useState(false);


    const changeRemark = () => {
        if (remarkValue === "") {
            setRemarkError("Uwagi nie mogą być puste")
            return;
        }
        setIsLoading(prevState => !prevState);

        handleChangingRemark(remarkValue)
            .then(resetRemark)
            .then(() => setRemarkError(""))
            .finally(() => setIsLoading(prevState => !prevState));
    }

    const lastRow = isCompleted(status) ? <OrderDetailsTextRow header="Uwagi" value={remark}/> :
        <OrderDetailsInputRow header="Uwagi"
                              value={remarkValue}
                              setValue={setRemarkValue}
                              onButtonClick={changeRemark}
                              buttonText="Aktualizuj"
                              loading={isLoading}
                              error={remarkError}/>
    return (
        <div className="order-details-box">
            <OrderDetailsTextRow header="Model urządzenia" value={getTranslatedModel(requestedModel)}/>
            <OrderDetailsTextRow header="Numer MPK" value={mpkNumber}/>
            <OrderDetailsTextRow header="Metoda dostawy" value={translateDeliveryType(deliveryType)}/>
            <OrderDetailsTextRow header="Urządzenie przypisane do" value={getUsernameDisplay(receiver)}/>
            <OrderDetailsTextRow header="Zadanie przypisane do"
                                 value={assignedTo ? getUsernameDisplay(assignedTo) : "-"}/>
            <OrderDetailsTextRow header="Zadanie przypisane przez"
                                 value={assignedBy ? getUsernameDisplay(assignedBy) : "-"}/>
            <OrderDetailsTextRow header="Zamówienie złożone przez" value={getUsernameDisplay(requester)}/>
            <OrderDetailsTextRow header="Adres wysyłki" value={deliveryAddress}/>
            <OrderDetailsTextRow header="Data odbioru" value={moment(pickupDate).format('DD-MM-YYYY')}/>
            <OrderDetailsTextRow header="Uwagi zamówienia" value={remark ? remark : "-"}/>
            {lastRow}
        </div>
    );
};

export default OrderDetailsDhl;