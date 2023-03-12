import "./LoginPage.css"
import {useHistory} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import useInputState from "../../../hooks/useInputState";
import {Box, TextField, Typography} from "@mui/material";
import LinkButton from "../../../components/Commons/LinkButton";
import {login} from "../../../services/login-service";
import {BAD_REQUEST, UNAUTHORIZED} from "../../../constants/http-statuses";
import roleNavigationMap from "../../../utils/roleUtils";
import jwtDecode from "jwt-decode";
import CustomSnackbar from "../../../components/Commons/CustomSnackbar";
import useSnackbar from "../../../hooks/useSnackbar";
import {LoadingButton} from "@mui/lab";

const LoginPage = ({location}) => {
    const history = useHistory();
    const {changeToken} = useContext(AuthContext);
    const [username, updateUsername, , usernameError, setUsernameError] = useInputState("");
    const [password, updatePassword, , passwordError, setPasswordError] = useInputState("");
    const [, setAuthError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, , closeSnackbar, handleError] = useSnackbar();

    const handleLogin = event => {
        event.preventDefault();
        setUsernameError(false);
        setPasswordError(false);
        setAuthError(false);

        const credentials = {
            username: username,
            password: password
        };

        setIsLoading(prevState => !prevState);

        login(credentials)
            .then(changeToken)
            .then(resetAuthError)
            .then(redirectToMainPage)
            .catch(handleAuthError)
            .finally(() => setIsLoading(prevState => !prevState));
    }

    const resetAuthError = (newToken) => {
        setAuthError(false);
        return newToken
    }

    const redirectToMainPage = (newToken) => {
        if (location.state) {
            history.push(location.state.url);
        } else {
            const user = jwtDecode(newToken);

            const userMainPage = roleNavigationMap.get(user.role)[0].href;
            history.push(userMainPage);
        }
    }

    const handleAuthError = error => {
        if (error.response.status === BAD_REQUEST) {
            if (error.response.data.validationErrors.username) {
                setUsernameError(true);
            }
            if (error.response.data.validationErrors.password) {
                setPasswordError(true);
            }
        } else if (error.response.status === UNAUTHORIZED) {
            setAuthError(true)
            handleError(error)
        }
    }

    return (
        <div>
            <div className="left split"/>
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
                        <Typography component="h1" variant="h5" fontWeight="5">
                            Logowanie do konta
                        </Typography>
                        <Box component="form" onSubmit={handleLogin}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Login"
                                name="username"
                                helperText={usernameError ? "Login nie może być pusty" : ""}
                                error={usernameError}
                                value={username}
                                onChange={updateUsername}
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
                                Zaloguj
                            </LoadingButton>
                            <div className="button-row">
                                <LinkButton to='/register' text="Stwórz konto"/>
                            </div>
                        </Box>
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
}
export default LoginPage