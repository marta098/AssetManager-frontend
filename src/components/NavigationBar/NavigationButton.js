import React from 'react';
import "../../styles/styles.css"
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    button: {
        backgroundColor: "#D40511",
        color: 'inherit',
        padding: "10px 70px",
        marginRight: 12,
        height: 50,
        width: 100,
        '&:hover': {
            backgroundColor: "#ff000e"
        },
    },
})

const NavigationButton = ({text, href, onClick}) => {
    const classes = useStyles();

    return (
        <Link to={href || "/"}>
            <Button className={`${classes.button} navbar-button`} onClick={onClick}>
                {text}
            </Button>
        </Link>
    );
};

export default NavigationButton;