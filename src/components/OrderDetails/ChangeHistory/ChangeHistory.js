import React from 'react';
import {Typography} from "@mui/material";
import ChangeHistoryBox from "./ChangeHistoryBox";
import "./ChangeHistory.css"

const ChangeHistory = ({changeHistory, deliveryType}) => {
    const isChangeHistoryNotEmpty = changeHistory.length > 0;
    return (
        <div className="change-history">
            <Typography variant="h3">{isChangeHistoryNotEmpty ? "Historia zmian" : "Historia zmian pusta"}</Typography>
            {isChangeHistoryNotEmpty && <ChangeHistoryBox changeHistory={changeHistory} deliveryType={deliveryType}/>}
        </div>
    );
};

export default ChangeHistory;