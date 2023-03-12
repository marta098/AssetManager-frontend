import React from 'react';
import {Typography} from "@mui/material";
import "../../OrderDetails/ChangeHistory/ChangeHistory.css"
import AssetChangeHistoryBox from "./AssetChangeHistoryBox";

const AssetChangeHistory = ({changeHistory}) => {
    const isChangeHistoryNotEmpty = changeHistory.length > 0;
    return (
        <div className="change-history">
            <Typography
                variant="h3">{isChangeHistoryNotEmpty ? "Historia zmian" : "Historia zmian jest pusta"}</Typography>
            {isChangeHistoryNotEmpty && <AssetChangeHistoryBox changeHistory={changeHistory}/>}
        </div>
    );
};

export default AssetChangeHistory;