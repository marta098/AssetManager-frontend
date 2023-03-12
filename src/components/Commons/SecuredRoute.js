import React, {useContext} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";
import RouteNotAccessible from "../Errors/RouteNotAccessible";

const SecuredRoute = ({component: Component, roles, ...restOfProps}) => {
    const {isAuthenticated, getUser} = useContext(AuthContext);
    const url = window.location.pathname;

    if (roles && !roles.includes(getUser().role)) {
        return (<RouteNotAccessible/>);
    }

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated() ? <Component {...props} /> : <Redirect to={{pathname: "/login", state: {url: url}}}/>
            }
        />
    );
};

export default SecuredRoute;