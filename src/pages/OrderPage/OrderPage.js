import {Box, Typography} from "@mui/material";
import "../../styles/styles.css"

import DataTable from "./DataTable";

const OrderPage = () => {
    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        background: "#f5f5f4",
        width: "95%",
        height: 80,
        marginTop: "2%",
        paddingLeft: "2%",
        marginLeft: "auto",
        marginRight: "auto"
    };

    return (
        <Box style={{width: "100%"}}>
            <Box style={flexContainer} sx={{flexGrow: 1, mr: 3}}>
                <Typography
                    variant="h6"
                    style={{alignSelf: "center", marginRight: "70%"}}>
                    Zamówienia</Typography>
            </Box>
            <div style={{marginTop: "20px", marginLeft: "1%", marginRight: "1%"}}>
                <Box sx={{minWidth: 500}}>
                    <DataTable/>
                </Box>
            </div>
        </Box>

    );
}
export default OrderPage;