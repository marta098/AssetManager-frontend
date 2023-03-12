import React from 'react';
import {Alert, Slide, Snackbar} from "@mui/material";

const CustomSnackbar = ({open, onClose, message, type}) => {
    return (
        <Snackbar open={open}
                  autoHideDuration={3000}
                  onClose={onClose}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                  TransitionComponent={Slide}>
            <Alert onClose={onClose} severity={type} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;