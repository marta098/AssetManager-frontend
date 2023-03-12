import {useState} from "react";

const useSnackbar = () => {
    const [value, setValue] = useState({
        open: false,
        type: "info",
        message: ""
    });

    const updateSnackbar = message => {
        setValue({
            open: true,
            type: "success",
            message: message
        })
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setValue({...value, open: false});
    }

    const handleError = error => {
        setValue({
            open: true,
            type: "error",
            message: error.response.data.message
        })
    }

    return [value, updateSnackbar, closeSnackbar, handleError];
}

export default useSnackbar;