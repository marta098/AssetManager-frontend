import {Box, Typography} from "@mui/material";
import "../../styles/styles.css"
import AllAssetsDataTable from "./AllAssetsDataTable";

const AllAssets = () => {
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
                    Urządzenia</Typography>
            </Box>
            <div style={{marginTop: "20px", marginLeft: "1%", marginRight: "1%"}}>
                <Box sx={{minWidth: 500}}>
                    <AllAssetsDataTable/>
                </Box>
            </div>
        </Box>

    );
}
export default AllAssets;