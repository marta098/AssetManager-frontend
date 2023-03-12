import React, {useContext, useEffect, useState} from 'react';
import OrderDetailsTextRow from "./OrderDetailsTextRow";
import "./OrderDetailsBox.css"
import OrderDetailsDateRow from "./OrderDetailsDateRow";
import OrderDetailsInputRow from "./OrderDetailsInputRow";
import useInputState from "../../../hooks/useInputState";
import OrderDetailsSelectRow from "./OrderDetailsSelectRow";
import {getDeliveryTypeArray, getStatusArray} from "../../../utils/statusUtils";
import OrderDetailsSelectSearchRow from "./OrderDetailsSelectSearchRow";
import {fetchAllUsers, fetchAllUsersWithRole} from "../../../services/user-service";
import {fetchAllLocations, fetchDeprecationGlobalVariable} from "../../../services/util-service";
import {AuthContext} from "../../../contexts/AuthContext";
import ExistingAssetForm from "./ExistingAssetForm";
import NewAssetForm from "./NewAssetForm";
import UsedAssetSelector from "./UsedAssetSelector";
import {Box} from "@mui/material";
import {getModelArray} from "../../../utils/modelUtils";
import {getUsernameDisplay} from "../../../utils/userUtils";

const OrderDetailsIt = ({
                            asset, deliveryType, receiver, deliveryAddress, handleUpdateNewAsset, requester,
                            pickupDate, remark, status, assignedBy, assignedTo, handleUpdate, requestedModel, mpkNumber
                        }) => {

    const handleNull = (value) => {
        if (value === null) {
            return null;
        } else return value.id;
    };
    const handleNullUser = (value) => {
        if (value === null) {
            return "-";
        } else return getUsernameDisplay(value);
    };

    const {token, getUser} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [receiverValue, setReceiverValue] = useState({id: receiver.id, label: getUsernameDisplay(receiver)});
    // const [assignedByValue, setAssignedByValue] = useState({id: assignedBy.id, label: getUsernameDisplay(assignedBy)});
    const [receiverError, setReceiverError] = useState("");
    const [pickupDateValue, setPickupDateValue] = useState(pickupDate);
    const [pickupDateError, setPickupDateError] = useState("");
    const [serialNumberValue, setSerialNumberValue, resetSerialNumberValue, , , setSerialNumberExactValue] = useInputState(asset ? asset.serialNumber : null);
    const [requestedModelValue, setRequestedModelValue, , requestedModelError, setRequestedModelError] = useInputState(requestedModel);
    const [remarkValue, setRemarkValue, resetRemark] = useInputState("");
    const [deliveryAddressValue, setDeliveryAddressValue] = useInputState(deliveryAddress);
    const [statusValue, setStatusValue] = useInputState(status);
    const [deliveryTypeValue, setDeliveryTypeValue] = useInputState(deliveryType);
    const [serialNumberDetails, setSerialNumberDetails] = useState(null);
    const [isSerialNumberFound, setIsSerialNumberFound] = useState(false);
    const [isNewAssetSelected, setIsNewAssetSelected] = useState(false);
    const [newAssetSerialNumber, setNewAssetSerialNumber, , newAssetSerialNumberError, setNewAssetSerialNumberError] = useInputState("");
    const [newAssetDeprecation, setNewAssetDeprecation] = useState(new Date());
    const [newAssetDeprecationError, setNewAssetDeprecationError] = useState("");
    const [newAssetLocation, setNewAssetLocation, , newAssetLocationError, setNewAssetLocationError] = useInputState(undefined);
    const [newAssetName, setNewAssetName, , newAssetNameError, setNewAssetNameError] = useInputState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [assignedToValue, setAssignedToValue] = useInputState(assignedTo);
    const [assignedToValue, setAssignedToValue] = useState({id: handleNull(assignedTo), label: handleNullUser(assignedTo)});
    const [assignedByValue, setAssignedByValue] = useState({id: handleNull(assignedBy), label: handleNullUser(assignedBy)});
    const [assignedByChanged, setAssignedByChanged] = useState(false);
    const [modelFromExistingAsset, setModelFromExistingAsset] = useState("");
    // const [modelFromExistingAsset, setModelFromExistingAsset] = useState(requestedModel);
    const [selectedModel, setSelectedModel] = useInputState(requestedModel);
    const [ITEmployees, setITEmployees] = useState([]);
    const [existingModelChosen, setExistingModelChosen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let fetchedUsers = await fetchAllUsers(token);
            let fetchedLocations = await fetchAllLocations(token);
            let fetchedDeprecationMonths = await fetchDeprecationGlobalVariable(token);
            let fetchedITEmployees = await   fetchAllUsersWithRole("ROLE_EMPLOYEE_IT", token);

            fetchedUsers = fetchedUsers.map(user => {
                return {id: user.id, label: user.username}
            });
            fetchedLocations = fetchedLocations.map(location => {
                return {key: location.id, value: location.name}
            })
            fetchedITEmployees = fetchedITEmployees.map(user => {
                return {id: user.id, label: user.username}
            });

            setUsers(fetchedUsers);
            setLocations(fetchedLocations);
            setNewAssetDeprecation(addMonths(fetchedDeprecationMonths));
            setITEmployees(fetchedITEmployees)
        }

        fetchData();
    }, [])

    const addMonths = (months) => {
        const date = new Date();
        date.setMonth(date.getMonth() + months);

        return date;
    }

    const handleUpdatingOrder = () => {
        resetBaseErrors();
        if (!isBaseRequestValid()) {
            return;
        }

        setIsLoading(prevState => !prevState);

        if (isNewAssetSelected) {
            resetNewAssetErrors();
            if (!isNewAssetValid()) {
                setIsLoading(prevState => !prevState)
                return;
            }
            const newAsset = {
                serialNumber: newAssetSerialNumber,
                model: requestedModelValue,
                type: "LAPTOP",
                deprecation: newAssetDeprecation,
                locationId: newAssetLocation,
                name: newAssetName
            }

            const orderUpdate = {
                deliveryType: deliveryTypeValue,
                deliveryAddress: deliveryAddressValue,
                pickupDate: pickupDateValue,
                asset: newAsset,
                remark: remarkValue,
                status: statusValue,
                receiverId: receiverValue.id,
                requestedModel: requestedModelValue,
                assignedTo: assignedToValue.id,
                assignedBy: (assignedByChanged ? getUser().id : assignedByValue.id)
            };
            handleUpdateNewAsset(orderUpdate)
                .then(response => setSerialNumberExactValue(response.asset ? response.asset.serialNumber : null))
                .then(() => setIsNewAssetSelected(false))
                .then(resetRemark)
                .finally(() => setIsLoading(prevState => !prevState));
        } else {
            const orderUpdate = {
                deliveryType: deliveryTypeValue,
                deliveryAddress: deliveryAddressValue,
                pickupDate: pickupDateValue,
                serialNumber: serialNumberValue,
                remark: remarkValue,
                status: statusValue,
                receiverId: receiverValue.id,
                requestedModel: existingModelChosen ?  modelFromExistingAsset : selectedModel,
                assignedTo: assignedToValue.id,
                assignedBy: (assignedByChanged ? getUser().id : assignedByValue.id)
            }
            handleUpdate(orderUpdate)
                .then(resetRemark)
                .finally(() => setIsLoading(prevState => !prevState));
        }
    }

    const resetBaseErrors = () => {
        setReceiverError("");
        setPickupDateError("");
    }

    const isBaseRequestValid = () => {
        let isValid = true;

        if (!receiverValue) {
            setReceiverError("Pole 'Urządzenie przypisane do' nie może być puste");
            isValid = false;
        }
        if (!pickupDateValue) {
            setPickupDateError("Data odbioru nie może być pusta");
            isValid = false;
        }

        return isValid;
    }

    const resetNewAssetErrors = () => {
        setNewAssetSerialNumberError("");
        setRequestedModelError("");
        setNewAssetDeprecationError("");
        setNewAssetLocationError("");
        setNewAssetNameError("");
    }

    const isNewAssetValid = () => {
        let isValid = true;

        if (!newAssetSerialNumber) {
            setNewAssetSerialNumberError("Numer seryjny nie może być pusty");
            isValid = false;
        }
        if (!requestedModelValue) {
            setRequestedModelError("Model nie może być pusty");
            isValid = false;
        }
        if (!newAssetDeprecation) {
            setNewAssetDeprecationError("Data amortyzacji nie może być pusta");
            isValid = false;
        }
        if (!newAssetLocation) {
            setNewAssetLocationError("Lokalizacja nie może być pusta");
            isValid = false;
        }
        if (!newAssetName) {
            setNewAssetNameError("Nazwa nie może być pusta");
            isValid = false;
        }

        return isValid;
    }

    const newAssetErrors = {
        serialNumberError: newAssetSerialNumberError,
        requestedModelError: requestedModelError,
        deprecationError: newAssetDeprecationError,
        locationError: newAssetLocationError,
        nameError: newAssetNameError
    };

    let assetForm;
    if (isNewAssetSelected) {
        assetForm = <NewAssetForm
            models={getModelArray()}
            locations={locations}
            newAssetSerialNumber={newAssetSerialNumber}
            setNewAssetSerialNumber={setNewAssetSerialNumber}
            requestedModelValue={requestedModelValue}
            setRequestedModelValue={setRequestedModelValue}
            newAssetDeprecation={newAssetDeprecation}
            setNewAssetDeprecation={setNewAssetDeprecation}
            newAssetLocation={newAssetLocation}
            setNewAssetLocation={setNewAssetLocation}
            newAssetName={newAssetName}
            setNewAssetName={setNewAssetName}
            errors={newAssetErrors}
        />
    } else {

        assetForm = <ExistingAssetForm
            asset={asset}
            serialNumberDetails={serialNumberDetails}
            setSerialNumberDetails={setSerialNumberDetails}
            isSerialNumberFound={isSerialNumberFound}
            setIsSerialNumberFound={setIsSerialNumberFound}
            serialNumberValue={serialNumberValue}
            setSerialNumberValue={setSerialNumberValue}
            requestedModelValue={selectedModel}
            // requestedModelValue={existingModelChosen ? modelFromExistingAsset : selectedModel}
            setRequestedModelValue={setRequestedModelValue}
            requestedModel={requestedModel}
            resetSerialNumberValue={resetSerialNumberValue}
            models={getModelArray()}
            setModelFromExistingAsset={setModelFromExistingAsset}
            modelFromExistingAsset={modelFromExistingAsset}
            setSelectedModel={setSelectedModel}
            // selectedModel={selectedModel}
            selectedModel={existingModelChosen ? modelFromExistingAsset : selectedModel}
            setExistingModelChosen={setExistingModelChosen}
        />
    }

    let addressField;
    if (deliveryTypeValue === "SHIPMENT") {
        addressField = <OrderDetailsInputRow header="Adres wysyłki"
                                             value={deliveryAddressValue}
                                             setValue={setDeliveryAddressValue}/>
    }

       return (
        <div className="order-details-box">
            <OrderDetailsTextRow header="Zamówienie złożone przez" value={requester.username}/>
            <OrderDetailsTextRow header="Numer MPK" value={mpkNumber}/>
            <OrderDetailsSelectSearchRow header="Urządzenie przypisane do"
                                         selectValuesMap={users}
                                         setValue={setReceiverValue}
                                         value={receiverValue}
                                         label="Wybierz pracownika"
                                         error={receiverError}/>
            <OrderDetailsSelectRow header="Metoda dostawy"
                                   value={deliveryTypeValue}
                                   setValue={setDeliveryTypeValue}
                                   selectValuesMap={getDeliveryTypeArray(deliveryType)}
            />
            {addressField}
            <OrderDetailsDateRow header="Data odbioru"
                                 value={pickupDateValue}
                                 changeValue={setPickupDateValue}
                                 error={pickupDateError}/>
            <OrderDetailsSelectSearchRow
                                 header="Zadanie przypisane do"
                                 selectValuesMap={ITEmployees}
                                 setValue={setAssignedToValue}
                                 setAssignedByChanged={setAssignedByChanged}
                                 value={assignedToValue}
                                 label="Wybierz pracownika"
                                 error={receiverError}/>
            <OrderDetailsTextRow header="Zadanie przypisane przez" value={assignedByValue ? assignedByValue.label : "-"}/>
            <OrderDetailsTextRow header="Uwagi zamówienia" value={remark ? remark : "-"}/>
            <Box sx={{borderTop: 1, borderBottom: 1, borderColor: "grey.500"}}>
                <UsedAssetSelector isNewAssetSelected={isNewAssetSelected}
                                   setIsNewAssetSelected={setIsNewAssetSelected}/>
                {assetForm}
            </Box>
            <OrderDetailsInputRow header="Uwagi"
                                  value={remarkValue}
                                  setValue={setRemarkValue}/>
            <OrderDetailsSelectRow header="Status"
                                   value={statusValue}
                                   setValue={setStatusValue}
                                   selectValuesMap={getStatusArray(deliveryType)}
                                   onButtonClick={handleUpdatingOrder}
                                   buttonText="Aktualizuj"
                                   loading={isLoading}
                // assignedToParam={assignedToValue}
                                   assignedToParam={assignedBy ? assignedBy.username : "-"}/>

        </div>
    );
};

export default OrderDetailsIt;