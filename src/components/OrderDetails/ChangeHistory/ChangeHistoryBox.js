import React from 'react';
import "./ChangeHistory.css"
import ChangeHistoryHeaders from "./ChangeHistoryHeaders";
import ChangeHistoryRow from "./ChangeHistoryRow";

const ChangeHistoryBox = ({changeHistory, deliveryType}) => {
    const sortByDate = (firstValue, secondValue) => new Date(secondValue.timestamp) - new Date(firstValue.timestamp);

    const changeHistoryRows = changeHistory
        .sort(sortByDate)
        .map((changeHistory, index) => <ChangeHistoryRow key={index} {...changeHistory} deliveryType={deliveryType}/>);

    return (
        <div className="change-history-box">
            <ChangeHistoryHeaders/>
            {changeHistoryRows}
        </div>
    );
};

export default ChangeHistoryBox;