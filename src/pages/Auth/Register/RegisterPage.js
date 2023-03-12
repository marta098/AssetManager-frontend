import useInputState from "../../../hooks/useInputState";
import {Box, TextField, Typography} from "@mui/material";
import LinkButton from "../../../components/Commons/LinkButton";
import "./RegisterPage.css"
import {registerApiCall} from "../../../services/register-service";
import {useHistory} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {BAD_REQUEST, CONFLICT} from "../../../constants/http-statuses";
import jwtDecode from "jwt-decode";
import roleNavigationMap from "../../../utils/roleUtils";
import CustomSnackbar from "../../../components/Commons/CustomSnackbar";
import useSnackbar from "../../../hooks/useSnackbar";
import {LoadingButton} from "@mui/lab";

const RegisterPage = () => {
    const [password, updatePassword, , passwordError, setPasswordError] = useInputState("");
    const [email, updateEmail, , emailError, setEmailError] = useInputState("");
    const [username, updateUsername, , usernameError, setUsernameError] = useInputState("");
    const history = useHistory();
    const {changeToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, , closeSnackbar, handleError] = useSnackbar();

    const handleRegister = e => {
        e.preventDefault();
        setUsernameError(false);
        setPasswordError(false);
        setEmailError(false);

        const userDetails = {
            username: username,
            password: password,
            email: email
        };

        setIsLoading(prevState => !prevState);

        registerApiCall(userDetails)
            .then(changeToken)
            .then(redirectToMainPage)
            .catch(handleAuthError)
            .finally(() => setIsLoading(prevState => !prevState));
    }

    const redirectToMainPage = (newToken) => {
        const user = jwtDecode(newToken);

        const userMainPage = roleNavigationMap.get(user.role)[0].href;
        history.push(userMainPage);
    }

    const handleAuthError = error => {
        if (error.response.status === BAD_REQUEST) {
            if (error.response.data.validationErrors.username) {
                setUsernameError(true);
            }
            if (error.response.data.validationErrors.password) {
                setPasswordError(true);
            }
            if (error.response.data.validationErrors.email) {
                setEmailError(true);
            }
        } else if (error.response.status === CONFLICT) {
            handleError(error)
        }
    }

    return (
        <div>
            <div className="split left"/>
            <div className="split right">
                <div className="centered">
                    <Typography
                        marginTop={"auto"}
                        marginBottom={10}
                        variant="h2"
                    >
                        Asset Manager
                    </Typography>
                    <Box marginY={"auto"}>
                        <Typography
                            component="h1"
                            variant="h5"
                            fontWeight="5"
                        >
                            Zarejestruj się
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleRegister}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="username"
                            label="Login"
                            name="username"
                            helperText={usernameError ? "Nazwa użytkownika musi zawierać co najmniej 3 znaki" : ""}
                            error={usernameError}
                            value={username}
                            onChange={updateUsername}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            helperText={emailError ? "Email musi posiadać domenę @dhl.com" : ""}
                            error={emailError}
                            value={email}
                            onChange={updateEmail}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="password"
                            label="Hasło"
                            name="password"
                            type="password"
                            helperText={passwordError ? "Hasło musi zawierać co najmniej 8 znaków" : ""}
                            error={passwordError}
                            value={password}
                            onChange={updatePassword}
                        />
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 10, mb: 2}}
                        >
                            Zarejestruj
                        </LoadingButton>
                        <div className="button-row">
                            <LinkButton to='/login' text="Zaloguj"/>
                        </div>
                    </Box>
                </div>
            </div>
            <CustomSnackbar
                open={snackbar.open}
                type={snackbar.type}
                onClose={closeSnackbar}
                message={snackbar.message}/>
        </div>
    );
};
export default RegisterPage