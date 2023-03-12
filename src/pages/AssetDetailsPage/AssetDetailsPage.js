import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {Typography} from "@mui/material";
import AssetDetails from "../../components/AssetDetails/AssetDetails";
import OrderHistory from "../../components/AssetDetails/OrderHistory/OrderHistory";
import {fetchAssetDetails, updateAsset} from "../../services/asset-service";
import CustomSnackbar from "../../components/Commons/CustomSnackbar";
import useSnackbar from "../../hooks/useSnackbar";
import AssetChangeHistory from "../../components/AssetDetails/AssetChangeHistory/AssetChangeHistory";
import BaseButton from "../../components/Commons/BaseButton";
import {useHistory} from "react-router-dom";

const AssetDetailsPage = ({assetId}) => {
    const {token} = useContext(AuthContext);
    const [assetDetails, setAssetDetails] = useState(null);
    const [snackbar, updateSnackbar, closeSnackbar, handleError] = useSnackbar();
    const history = useHistory();

    useEffect(() => {
    fetchAssetDetails(assetId, token)
        .then(setAssetDetails)
        .catch(handleError);
    }, [])


    const handleUpdatingAsset = assetUpdate => {
        return updateAsset(assetId, assetUpdate, token)
            .then(setAssetDetails)
            .then(() => updateSnackbar("Urządzenie zaktualizowane!"))
            .catch(handleError);
    }

    if (assetDetails === null) {
        return null;
    }

    return (
        <div className="orderDetailsDiv">
            <Typography variant="h3">
                Urządzenie {assetDetails.serialNumber}
            </Typography>
            <AssetDetails {...assetDetails}
                          handleUpdate={handleUpdatingAsset}
            />
            <OrderHistory orderHistory={assetDetails.orders}/>
            <AssetChangeHistory changeHistory={assetDetails.changeHistory} />
            <CustomSnackbar
                open={snackbar.open}
                type={snackbar.type}
                onClose={closeSnackbar}
                message={snackbar.message}/>
            <div className="footer-div">
                <BaseButton text={"Powrót"} onClick={history.goBack}/>
           </div>
        </div>
    );
}

export default AssetDetailsPage


