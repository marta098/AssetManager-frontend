import React from 'react';
import "./ChangeHistory.css"
import {Typography} from "@mui/material";
import moment from "moment";
import {getTranslatedStatus} from "../../../utils/statusUtils";
import {getUsernameDisplay} from "../../../utils/userUtils";

const ChangeHistoryRow = ({timestamp, status, remark, author, deliveryType}) => {
    return (
        <div className="change-history-row">
            <div className="change-history-column">
                <Typography variant="h6">{moment(timestamp).format("DD-MM-YYYY HH:mm")}</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h6">{getTranslatedStatus(status, deliveryType)}</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h6">{remark ? remark : "-"}</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h6">{getUsernameDisplay(author)}</Typography>
            </div>
        </div>
    );
};

export default ChangeHistoryRow;