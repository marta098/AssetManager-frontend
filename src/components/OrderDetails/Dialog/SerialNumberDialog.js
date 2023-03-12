import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Typography} from "@mui/material";
import {getAssetTranslatedStatus, getTranslatedStatus} from "../../../utils/statusUtils";
import BaseButton from "../../Commons/BaseButton";
import SerialNumberRow from "./SerialNumberRow";
import {getTranslatedModel} from "../../../utils/modelUtils";

const SerialNumberDialog = ({
                                isOpen, toggleDialog, isFound, details, requestedModel, resetSerialNumber,
                                setModelFromExistingAsset, setExistingModelChosen
                            }) => {
    let dialogContent;
    let dialogActions;

    const handleCancel = () => {
        resetSerialNumber();
        toggleDialog();
    }

    const handleApproval = () => {

        setModelFromExistingAsset(details.model);
        setExistingModelChosen(true);
        toggleDialog();
    }

    if (isFound) {
        const isModelSameAsRequested = requestedModel === details.model;
        dialogContent = <DialogContent>
            <div className="serial-number-box">
                <SerialNumberRow header="Numer seryjny" value={details.serialNumber}/>
                <SerialNumberRow header="Model"
                                 value={isModelSameAsRequested ? details.model : `Niezgodny z zamówieniem (${getTranslatedModel(details.model)})`}/>
                <SerialNumberRow header="Aktualnie przypisany do"
                                 value={details.currentUser ? details.currentUser.username : "-"}/>
                <SerialNumberRow header="Status" value={getAssetTranslatedStatus(details.status)}/>
            </div>
        </DialogContent>;

        if (!isModelSameAsRequested) {
            dialogActions = <DialogActions style={{justifyContent: "center"}}>
                <BaseButton text="Odrzuć" onClick={handleCancel}/>
                <BaseButton text="Potwierdź" onClick={handleApproval}/>
            </DialogActions>
        } else {
            dialogActions = <DialogActions style={{justifyContent: "center"}}>
                <BaseButton text="Powrót" onClick={toggleDialog}/>
            </DialogActions>
        }
    } else {
        dialogContent = <DialogContent style={{textAlign: "center"}}>
            <Typography variant="h5">
                Zamówienie o podanym numerze seryjnym nie istnieje w bazie
            </Typography>
        </DialogContent>

        dialogActions = <DialogActions style={{justifyContent: "center"}}>
            <BaseButton text="Powrót" onClick={toggleDialog}/>
        </DialogActions>
    }

    return (
        <Dialog open={isOpen} onClose={toggleDialog} fullWidth maxWidth="lg">
            <DialogTitle variant="h4" style={{textAlign: "center"}}>
                {isFound ? "Urządzenie znalezione w bazie" : "Urządzenie nieznalezione w bazie"}
            </DialogTitle>
            {dialogContent}
            {dialogActions}
        </Dialog>
    );
};

export default SerialNumberDialog;