import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const LinkButton = ({to, text}) => {
    return (
        <Link to={to} style={{textDecoration: 'none'}}>
            <Button fullWidth variant="outlined">
                {text}
            </Button>
        </Link>
    );
};

export default LinkButton;