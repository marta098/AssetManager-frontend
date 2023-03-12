import React, {useContext, useEffect, useState} from 'react';
import {fetchAssetDetails} from "../../services/asset-service";
import {AuthContext} from "../../contexts/AuthContext";
import CenteredMessage from "../../components/Errors/CenteredMessage";
import AssetDetailsTextRow from "../../components/AssetDetails/AssetDetailsTextRow";
import "../../components/AssetDetails/AssetDetailsBox/AssetDetailsBox.css"
import {useHistory} from "react-router-dom";
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {getTranslatedModel} from "../../utils/modelUtils";
import {formatDateWithoutTime} from "../../utils/dateUtils";

const useStyles = makeStyles({
    button: {
        backgroundColor: "#D40511",
        color: '#ffffff',
        padding: 2,
        marginTop: 20,
        marginRight: 12,
        height: 50,
        width: 100,
        '&:hover': {
            backgroundColor: "#ff000e"
        },
    },
})

const AssetDetails = ({assetId}) => {
    const {token} = useContext(AuthContext);
    const [assetDetails, setAssetDetails] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        fetchAssetDetails(assetId, token)
            .then(setAssetDetails)
            .catch(handleError);
    }, [])

    const handleError = error => {
        setErrorMessage(error.response.data.message)
    }

    if (errorMessage) {
        return <CenteredMessage text={errorMessage}/>
    }

    return (
        <div className="asset-details-div">
            <div className="asset-details-box">
                <AssetDetailsTextRow header="Urządzenie" value={assetDetails.type}/>
                <AssetDetailsTextRow header="Numer Crest" value={assetDetails.crestCode}/>
                <AssetDetailsTextRow header="Numer Seryjny" value={assetDetails.serialNumber}/>
                <AssetDetailsTextRow header="Model urządzenia" value={getTranslatedModel(assetDetails.model)}/>
                <AssetDetailsTextRow header="Data wygaśnięcia amortyzacji"
                                     value={formatDateWithoutTime(assetDetails.deprecation)}/>
            </div>
            <Button className={`${classes.button} navbar-button`} onClick={history.goBack}>Powrót</Button>
        </div>
    );
};

export default AssetDetails;