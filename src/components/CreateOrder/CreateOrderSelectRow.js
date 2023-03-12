import React from 'react';
import {FormControl, FormHelperText, MenuItem, Select, Typography} from "@mui/material";


const CreateOrderSelectRow = ({header, value, setValue, selectValuesMap, error}) => {
    const menuItems = Array.from(selectValuesMap)
        .map(object => <MenuItem key={object.key} value={object.key}>{object.value}</MenuItem>);

    let isErrorVisible = false;
    if (error && error !== "") {
        isErrorVisible = true
    }
    return (
        <div className="order-details-row">
            <div className="order-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="order-details-column">
                <FormControl style={{width: "100%"}} error={isErrorVisible}>
                    <Select value={value} onChange={setValue} variant="outlined"
                            className="middle-column-content">
                        {menuItems}
                    </Select>
                    {isErrorVisible && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
            </div>
        </div>
    );
};

export default CreateOrderSelectRow;