import React, {useContext} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {Redirect} from "react-router-dom";
import roleNavigationMap from "../../utils/roleUtils";

const MainPageRedirect = () => {
    const {getUser} = useContext(AuthContext);
    const user = getUser();

    if (user) {
        const userMainPage = roleNavigationMap.get(user.role)[0].href;
        return <Redirect to={userMainPage}/>
    }
    return (
        <Redirect to="/login"/>
    );
};

export default MainPageRedirect;