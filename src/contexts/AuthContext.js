import {createContext, useState} from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("jwt"));

    const changeToken = (newToken) => {
        localStorage.setItem("jwt", newToken);
        setToken(newToken);
        return newToken;
    }

    const logout = () => {
        localStorage.removeItem("jwt");
        setToken(null);
    }

    const getUser = () => {
        if (!token) {
            return null;
        }

        return jwtDecode(token);
    }

    const isAuthenticated = () => {
        if (!token) {
            return false;
        }

        const user = getUser();
        const exp = new Date(user.exp * 1000);
        const isTokenNotExpired = new Date().getTime() < exp.getTime();
        if (!isTokenNotExpired) {
            logout();
        }

        return isTokenNotExpired;
    }

    return (
        <AuthContext.Provider value={{token, changeToken, logout, isAuthenticated, getUser}}>
            {props.children}
        </AuthContext.Provider>
    )

}