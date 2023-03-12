import {Route, Switch, useRouteMatch} from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import OrderPage from "../OrderPage/OrderPage";
import ReportPage from "../Reports/ReportPage";
import SecuredRoute from "../../components/Commons/SecuredRoute";
import DashboardPage from "../Dashboard/DashboardPage";
import EmployeesPage from "../Employees/EmployeesPage";
import YourAssetsPage from "../YourAssets/YourAssetsPage";
import YourOrdersPage from "../YourOrders/YourOrdersPage";
import PageNotFound from "../../components/Errors/PageNotFound";
import OrderDetails from "../OrderDetails/OrderDetails";
import CreateOrder from "../CreateOrder/CreateOrder";
import YourAssetDetails from "../YourAssetDetails/YourAssetDetails";
import {Box} from "@mui/material";
import AllAssets from "../AllAssets/AllAssets";
import AssetDetailsPage from "../../pages/AssetDetailsPage/AssetDetailsPage";
import CreatedOrdersPage from "../CreatedOrders/CreatedOrdersPage";

const MainPage = () => {
    const {path} = useRouteMatch();

    return (
        <Box>
            <NavigationBar/>
            <Box style={{display: "flex", justifyContent: "center"}}>
                <Switch>
                    <SecuredRoute exact path={`${path}/dashboard`}
                                  roles={["ROLE_MANAGER_IT"]}
                                  component={DashboardPage}/>
                    <SecuredRoute exact path={`${path}/employees`}
                                  roles={["ROLE_MANAGER_IT"]}
                                  component={EmployeesPage}/>
                    <SecuredRoute exact path={`${path}/orders`}
                                  roles={["ROLE_EMPLOYEE_IT"]}
                                  component={OrderPage}/>
                    <SecuredRoute exact path={`${path}/reports`}
                                  roles={["ROLE_EMPLOYEE_IT"]}
                                  component={ReportPage}/>
                    <SecuredRoute exact path={`${path}/your-assets`}
                                  roles={["ROLE_MANAGER_DHL", "ROLE_EMPLOYEE_DHL"]}
                                  component={YourAssetsPage}/>
                    <SecuredRoute exact path={`${path}/your-orders`}
                                  roles={["ROLE_MANAGER_DHL", "ROLE_EMPLOYEE_DHL"]}
                                  component={YourOrdersPage}/>
                    <SecuredRoute exact path={`${path}/created-orders`}
                                  roles={["ROLE_MANAGER_DHL"]}
                                  component={CreatedOrdersPage}/>
                    <SecuredRoute exact path={`${path}/orders/:orderId`}
                                  roles={["ROLE_EMPLOYEE_IT", "ROLE_MANAGER_DHL", "ROLE_EMPLOYEE_DHL"]}
                                  component={routeParams => <OrderDetails
                                      orderId={routeParams.match.params.orderId}/>}/>
                    <SecuredRoute exact path={`${path}/your-orders/create`}
                                  roles={["ROLE_MANAGER_DHL"]}
                                  component={CreateOrder}/>
                    <SecuredRoute exact path={`${path}/your-assets/:assetId`}
                                  roles={["ROLE_MANAGER_DHL", "ROLE_EMPLOYEE_DHL"]}
                                  component={routeParams => <YourAssetDetails
                                      assetId={routeParams.match.params.assetId}/>}/>
                    <SecuredRoute exact path={`${path}/all-assets`}
                                  roles={["ROLE_MANAGER_IT", "ROLE_EMPLOYEE_IT"]}
                                  component={AllAssets}/>
                    <SecuredRoute exact path={`${path}/asset/:assetId`}
                                  roles={["ROLE_MANAGER_IT", "ROLE_EMPLOYEE_IT"]}
                                  component={routeParams => <AssetDetailsPage
                                      assetId={routeParams.match.params.assetId}/>}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Box>
        </Box>
    );

}
export default MainPage