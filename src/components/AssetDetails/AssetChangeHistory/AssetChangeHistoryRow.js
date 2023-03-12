import React from 'react';
import "../../OrderDetails/ChangeHistory/ChangeHistory.css"
import {Typography} from "@mui/material";
import {getAssetTranslatedStatus} from "../../../utils/statusUtils";
import {formatDateWithoutSeconds} from "../../../utils/dateUtils";
import {getUsernameDisplay} from "../../../utils/userUtils";

const ChangeHistoryRow = ({timestamp, assignmentDate, status, remark, author, deprecation, owner, dischargeDate}) => {

    return (
        <div className="change-history-row">
            <div className="change-history-column">
                <Typography variant="h6">{formatDateWithoutSeconds(timestamp)}</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h6">{owner ? getUsernameDisplay(owner) : "-"}</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h6">{assignmentDate ? formatDateWithoutSeconds(assignmentDate) : "-"}</Typography>
            </div>
            <div className="change-history-column">
                <Typography
                    variant="h6">{dischargeDate ? formatDateWithoutSeconds(dischargeDate) : "-"}</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h6">{formatDateWithoutSeconds(deprecation)}</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h6">{getAssetTranslatedStatus(status)}</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h6">{remark ? remark : "-"}</Typography>
            </div>
            <div className="change-history-column">
                <Typography variant="h6">{author ? getUsernameDisplay(author) : "-"}</Typography>
            </div>
        </div>
    );
};

export default ChangeHistoryRow;