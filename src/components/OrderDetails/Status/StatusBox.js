import React from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderStatus.css"
import {Typography} from "@mui/material";
import {getTranslatedStatus} from "../../../utils/statusUtils";

const StatusBox = ({status, isChecked, step, deliveryType}) => {
    return (
        <div className="status-box">
            {isChecked ? <CheckCircleIcon style={{fill: "green", height: "50px", width: "50px"}}/> :
                <Typography className="status-circle">{step}</Typography>}
            <Typography variant="h6">{getTranslatedStatus(status, deliveryType)}</Typography>
        </div>
    );
};

export default StatusBox;