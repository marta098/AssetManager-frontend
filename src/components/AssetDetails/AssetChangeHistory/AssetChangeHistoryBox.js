import React from 'react';
import "../../OrderDetails/ChangeHistory/ChangeHistory.css"
import AssetChangeHistoryRow from "./AssetChangeHistoryRow";
import AssetChangeHistoryHeaders from "./AssetChangeHistoryHeaders";

const AssetChangeHistoryBox = ({changeHistory}) => {
    const sortByDate = (firstValue, secondValue) => new Date(secondValue.timestamp) - new Date(firstValue.timestamp);

    const changeHistoryRows = changeHistory
        .sort(sortByDate)
        .map((changeHistory, index) => <AssetChangeHistoryRow key={index} {...changeHistory}/>);

    return (
        <div className="change-history-box">
            <AssetChangeHistoryHeaders/>
            {changeHistoryRows}
        </div>
    );
};

export default AssetChangeHistoryBox;