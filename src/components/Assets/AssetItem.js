import React from 'react';
import "../Assets/Asset.css"
import "../../styles/styles.css"
import {Typography} from "@mui/material";
import BaseButton from "../Commons/BaseButton";
import {getTranslatedModel} from "../../utils/modelUtils";
import {formatDateWithSeconds} from "../../utils/dateUtils";


const AssetItem = ({id, model, warrantyExpiration, routeChange}) => {
    let date = formatDateWithSeconds(warrantyExpiration);

    return (
        <div>
            <li className="asset-item" style={{backgroundColor: 'rgba(215,215,215,0.22)'}}>
                <div className="asset-property">
                    <Typography variant="h6">{getTranslatedModel(model)}</Typography>
                </div>
                <div className="asset-property">
                    <Typography variant="h6">Amortyzacja do : {date}</Typography>
                </div>
                <div className="button-details">
                    <BaseButton text="Szczegóły" onClick={() => routeChange(id)}/>
                </div>
            </li>
        </div>

    );
};

export default AssetItem;