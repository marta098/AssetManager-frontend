import React from 'react';
import {Typography} from "@mui/material";

const CenteredMessage = ({text}) => {
    return (
        <Typography className="middle-text" variant="h2">
            {text}
        </Typography>
    );
};

export default CenteredMessage;