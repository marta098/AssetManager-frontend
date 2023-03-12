import React from 'react';
import "./NotificationPanel.css"
import {Typography} from "@mui/material";
import {getDaysBetweenToday} from "../../utils/dateUtils";

const NotificationPanel = ({open, lastReportTimestamp}) => {
    const display = open ? "block" : "none"

    let notificationText;
    if (lastReportTimestamp) {
        const daysBetweenToday = getDaysBetweenToday(lastReportTimestamp);
        if (daysBetweenToday >= 7) {
            notificationText = `Raport ITAM nie został wygenerowany od ${daysBetweenToday} dni.`;
        } else {
            notificationText = "Brak powiadomień";
        }
    } else {
        notificationText = "Wygeneruj pierwszy raport";
    }

    return (
        <div className="notification-panel" style={{display: display}}>
            <Typography>{notificationText}</Typography>
        </div>
    );
};

export default NotificationPanel;