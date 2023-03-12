import React from 'react';
import {Typography} from "@mui/material";
import "../../styles/styles.css"

const RouteNotAccessible = () => {
    return (
        <Typography className="middle-text" variant="h2">
            Strona niedostępna dla Twojej roli
        </Typography>
    );
};

export default RouteNotAccessible;