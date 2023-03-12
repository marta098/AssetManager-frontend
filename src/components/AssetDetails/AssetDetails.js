import React, {useContext, useEffect, useState} from 'react';
import OrderDetailsTextRow from "../OrderDetails/OrderDetailsBox/OrderDetailsTextRow";
import "../OrderDetails/OrderDetailsBox/OrderDetailsBox.css"
import useInputState from "../../hooks/useInputState";
import {assetStatusMap} from "../../utils/statusUtils";
import {fetchAllUsers} from "../../services/user-service";
import {AuthContext} from "../../contexts/AuthContext";
import CenteredMessage from "../Errors/CenteredMessage";
import AssetDetailsTextRow from "./AssetDetailsBox/AssetDetailsTextRow";
import AssetDetailsSelectSearchRow from "./AssetDetailsBox/AssetDetailsSelectSearchRow";
import AssetDetailsInputRow from "./AssetDetailsBox/AssetDetailsInputRow";
import AssetDetailsDateRow from "./AssetDetailsBox/AssetDetailsDateRow";
import AssetDetailsSelectRow from "./AssetDetailsBox/AssetDetailsSelectRow";
import {fetchLocations, fetchStockrooms} from "../../services/util-service";
import {getTranslatedModel} from "../../utils/modelUtils";

const AssetDetails = ({
                          serialNumber, model, mpkNumber, deprecation, status,
                          crestCode, name, currentUser, stockroom, handleUpdate,
                          location
                      }) => {
    const handleNull = (value) => {
        if (value === null) {
            return {id: null, label: "-"};
        } else return {id: value.id, label: value.name};
    };

    const handleNullUser = (value) => {
        if (value === null) {
            return {id: null, label: "-"};
        } else return {id: value.id, label: value.email};
    };

    const {token} = useContext(AuthContext);
    const [remarkValue, setRemarkValue, resetRemark] = useInputState("");
    const [deprecationValue, setDeprecationValue] = useState(deprecation);
    const [statusValue, setStatusValue] = useInputState(status);
    const [locations, setLocations] = useState([]);
    const [locationValue, setLocationValue] = useState(handleNull(location));
    const [stockrooms, setStockrooms] = useState([]);
    const [stockroomValue, setStockroomValue] = useState(handleNull(stockroom));
    const [users, setUsers] = useState([]);
    const [currentUserValue, setCurrentUserValue] = useState(handleNullUser(currentUser));
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let fetchedUsers = await fetchAllUsers(token);
            let fetchedLocations = await fetchLocations(token);
            let fetchedLStockrooms = await fetchStockrooms(token);

            fetchedUsers = fetchedUsers.map(user => {
                return {id: user.id, label: user.email}
            });


            fetchedLocations = fetchedLocations.map(location => {
                return {id: location.id, label: location.name}
            });


            fetchedLStockrooms = fetchedLStockrooms.map(stockroom => {
                return {id: stockroom.id, label: stockroom.name}
            });

            setUsers(fetchedUsers);
            setLocations(fetchedLocations);
            setStockrooms(fetchedLStockrooms);
        }

        fetchData().catch(handleError);
    }, [])

    const handleError = error => {
        setErrorMessage(error.response.data.message)
    }

    if (errorMessage) {
        return <CenteredMessage text={errorMessage}/>
    }

    const handleUpdatingAsset = () => {
        setIsLoading(prevState => !prevState);

        const assetUpdate = {
            status: statusValue,
            remark: remarkValue,
            deprecation: deprecationValue,
            currentUserId: currentUserValue.id,
            locationId: locationValue.id,
            stockroomId: stockroomValue.id

        }

        handleUpdate(assetUpdate)
            .then(resetRemark)
            .finally(() => setIsLoading(prevState => !prevState));
    }

    return (
        <div className="order-details-box">
            <AssetDetailsTextRow header="Numer seryjny" value={serialNumber}/>
            <AssetDetailsTextRow header="Model urządzenia" value={getTranslatedModel(model)}/>
            <AssetDetailsTextRow header="Numer MPK" value={mpkNumber}/>
            <OrderDetailsTextRow header="CREST code" value={crestCode}/>
            <AssetDetailsTextRow header="Nazwa urządzenia" value={name}/>
            <AssetDetailsSelectRow header="Status" value={statusValue} setValue={setStatusValue}
                                   selectValuesMap={assetStatusMap}/>
            <AssetDetailsSelectSearchRow header="Lokalizacja" selectValuesMap={locations}
                                         status={statusValue} value={locationValue} setValue={setLocationValue}/>
            <AssetDetailsSelectSearchRow header="Magazyn" selectValuesMap={stockrooms}
                                         status={statusValue} value={stockroomValue} setValue={setStockroomValue}/>
            <AssetDetailsSelectSearchRow header="Urządzenie przypisane do" selectValuesMap={users}
                                         value={currentUserValue} setValue={setCurrentUserValue}
                                         status={statusValue}/>
            <AssetDetailsInputRow header="Uwagi" value={remarkValue} setValue={setRemarkValue}/>
            <AssetDetailsDateRow header="Amortyzacja"
                                 value={deprecationValue}
                                 changeValue={setDeprecationValue}
                                 onButtonClick={handleUpdatingAsset}
                                 loading={isLoading}/>
        </div>
    );
};

export default AssetDetails;