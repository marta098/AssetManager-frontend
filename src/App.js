import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/Auth/Login/LoginPage";
import RegisterPage from "./pages/Auth/Register/RegisterPage";
import MainPage from "./pages/MainPage/MainPage";
import {AuthProvider} from "./contexts/AuthContext";
import SecuredRoute from "./components/Commons/SecuredRoute";
import PageNotFound from "./components/Errors/PageNotFound";
import MainPageRedirect from "./components/Commons/MainPageRedirect";
import {ReportDateProvider} from "./contexts/ReportDateContext";

const App = () => {
    return (
        <AuthProvider>
            <ReportDateProvider>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <MainPageRedirect/>
                        </Route>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <SecuredRoute path="/main-page" component={MainPage}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </Router>
            </ReportDateProvider>
        </AuthProvider>
    );
};
export default App;