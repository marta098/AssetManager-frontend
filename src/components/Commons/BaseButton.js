import React from 'react';
import {LoadingButton} from "@mui/lab";

const BaseButton = ({text, color, onClick, loading}) => {
    let buttonStyle = {
        padding: 1.5,
        height: 50,
        width: 175,
        margin: 10
    }

    if (!loading) {
        buttonStyle.backgroundColor = color ? color : "#D40511";
        buttonStyle.color = '#ffffff';
    }

    return (
        <LoadingButton loading={loading} style={buttonStyle} variant="contained"
                       onClick={onClick}>{text}</LoadingButton>
    );
};

export default BaseButton;