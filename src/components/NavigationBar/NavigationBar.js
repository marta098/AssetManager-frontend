import {AppBar, Box, Stack, Toolbar, Typography} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import "../../styles/styles.css"
import {AuthContext} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import NavigationButton from "./NavigationButton";
import roleNavigationMap, {isEmployeeIt, isManagerIt} from "../../utils/roleUtils";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import NotificationPanel from "../Notification/NotificationPanel";
import useClickOutside from "../../hooks/useClickOutside";
import "./NavigationBar.css"
import {getDaysBetweenToday} from "../../utils/dateUtils";
import {ReportDateContext} from "../../contexts/ReportDateContext";
import {fetchLastReportDate} from "../../services/report-service";

const NavigationBar = () => {
    const ref = useRef();
    const {getUser, token, logout} = useContext(AuthContext);
    const {lastReportTimestamp, setLastReportTimestamp} = useContext(ReportDateContext);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const history = useHistory();
    useClickOutside(ref, () => setIsNotificationOpen(false));

    useEffect(() => {
        const user = getUser();
        if (user && (isEmployeeIt(user) || isManagerIt(user))) {
            fetchLastReportDate(token)
                .then(setLastReportTimestamp)
        }
    }, []);

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        marginLight: 100,
    }

    const handleLogout = () => {
        logout();
        history.push("/login");
    }

    const user = getUser();

    const userHeader = (
        <Typography component="div" style={{
            color: "#ffffff",
            alignContent: "center",
            marginRight: 30
        }} variant="h6">
            {user.username}
        </Typography>
    )

    const navigationButtons = roleNavigationMap.get(user.role)
        .map((navigationProps, index) => <NavigationButton key={index} href={navigationProps.href}
                                                           text={navigationProps.text}/>);

    const isNewNotification = () => {
        if (!lastReportTimestamp) {
            return true;
        }

        const daysBetweenToday = getDaysBetweenToday(lastReportTimestamp);
        return daysBetweenToday <= 7;
    }

    const toggleNotificationPanel = () => {
        fetchLastReportDate(token)
            .then(setLastReportTimestamp);

        setIsNotificationOpen(prevState => !prevState);
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{background: "#FFCC00"}}>
                <Toolbar>
                    <Box>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1, mr: 3}} style={{color: "#D40511"}}
                                    fontWeight={"bolder"}>
                            Asset Manager
                        </Typography>
                    </Box>
                    <Stack style={flexContainer}>
                        {navigationButtons}
                    </Stack>
                    <Box marginLeft="auto" marginRight="auto"/>
                    {(isEmployeeIt(user) || isManagerIt(user)) && (
                        <div ref={ref} className="notification-div">
                            {isNewNotification() ?
                                <NotificationsIcon onClick={toggleNotificationPanel}/> :
                                <NotificationImportantIcon style={{fill: "#D40511"}}
                                                           onClick={toggleNotificationPanel}/>}
                            <NotificationPanel open={isNotificationOpen} lastReportTimestamp={lastReportTimestamp}/>
                        </div>
                    )}
                    {userHeader}
                    <NavigationButton onClick={handleLogout} text="Wyloguj"/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavigationBar;