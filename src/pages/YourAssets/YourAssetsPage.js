import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {fetchAllUsersAssets} from "../../services/asset-service";
import AssetItem from "../../components/Assets/AssetItem";
import {Box, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import "../../components/Assets/Asset.css"

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    marginLight: 100,
    background: 'rgba(211,216,236,0.43)'
}

const YourAssetsPage = () => {
    const {token, getUser} = useContext(AuthContext);
    const [assets, setAssets] = useState([]);
    let history = useHistory();

    useEffect(() => {
        fetchAllUsersAssets(getUser().id, token)
            .then(setAssets)
    }, [])

    const routeChange = assetId => {
        history.push(`/main-page/your-assets/${assetId}`)
    }

    const assetItems = assets.map(asset => <AssetItem key={asset.id}
                                                      routeChange={routeChange}
                                                      {...asset}/>)

    let assetsContent;
    if (assetItems.length === 0) {
        assetsContent = <Typography variant="h6" marginTop={5} marginX={"auto"}>Brak urządzeń</Typography>
    } else {
        assetsContent = assetItems;
    }

    return (
        <ul className="asset-list">
            <Box style={flexContainer} sx={{flexGrow: 1}}>
                <Typography variant="h6" marginLeft={5} marginY={"auto"}>Twoje urządzenia</Typography>
            </Box>
            {assetsContent}
        </ul>
    );
};

export default YourAssetsPage;