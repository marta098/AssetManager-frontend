import React, {useContext, useState} from 'react';
import OrderDetailsTextRow from "./OrderDetailsTextRow";
import OrderDetailsInputRow from "./OrderDetailsInputRow";
import OrderDetailsSelectRow from "./OrderDetailsSelectRow";
import SerialNumberDialog from "../Dialog/SerialNumberDialog";
import {fetchSerialNumberDetails} from "../../../services/asset-service";
import {NOT_FOUND} from "../../../constants/http-statuses";
import {AuthContext} from "../../../contexts/AuthContext";
import useInputState from "../../../hooks/useInputState";

const ExistingAssetForm = ({
                               asset, serialNumberDetails, setSerialNumberDetails, isSerialNumberFound,
                               setIsSerialNumberFound, serialNumberValue, setSerialNumberValue,
                               models, requestedModel, resetSerialNumberValue,
                               setModelFromExistingAsset, setSelectedModel, selectedModel,
                               setExistingModelChosen
                           }) => {
    const {token} = useContext(AuthContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleReceivingSerialNumberResponse = details => {
        setSerialNumberDetails(details);
        setIsSerialNumberFound(true);
    }

    const handleCheckingSerialNumber = () => {
        fetchSerialNumberDetails(serialNumberValue, token)
            .then(handleReceivingSerialNumberResponse)
            .then(toggleDialog)
            .catch(handleSerialNumberError);
    }

    const handleSerialNumberError = error => {
        if (error.response && error.response.status === NOT_FOUND) {
            setIsSerialNumberFound(false);
            toggleDialog();
        }
    }

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    }

    return (
        <>
            <OrderDetailsTextRow header="CREST code" value={asset ? asset.crestCode : null}/>
            <OrderDetailsInputRow header="Numer seryjny"
                                  value={serialNumberValue}
                                  setValue={setSerialNumberValue}
                                  onButtonClick={handleCheckingSerialNumber}
                                  buttonText="Sprawdź"/>
            <OrderDetailsSelectRow header="Model urządzenia"
                                   value={selectedModel}
                                   setSelectedModel={setSelectedModel}
                                   selectValuesMap={models}/>
            <SerialNumberDialog isOpen={isDialogOpen}
                                toggleDialog={toggleDialog}
                                details={serialNumberDetails}
                                isFound={isSerialNumberFound}
                                requestedModel={requestedModel}
                                resetSerialNumber={resetSerialNumberValue}
                                setModelFromExistingAsset={setModelFromExistingAsset}
                                selectValuesMap={models}
                                setExistingModelChosen={setExistingModelChosen}/>
        </>
    );
};

export default ExistingAssetForm;