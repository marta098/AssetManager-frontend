import React, {useState} from 'react';
import {FormControl, FormHelperText, MenuItem, Select, Typography} from "@mui/material";
import BaseButton from "../../Commons/BaseButton";

const OrderDetailsSelectRow = ({
                                   header,
                                   value,
                                   setValue,
                                   onButtonClick,
                                   selectValuesMap,
                                   loading,
                                   error,

                                   assignedToParam,
                                   setSelectedModel
                               }) => {
    const [assignedToValue, setAssignedToValue] = useState(assignedToParam);
    const menuItems = selectValuesMap.map(object => <MenuItem key={object.key}
                                                              value={object.key}>{object.value}</MenuItem>);

    let isErrorVisible = false;
    if (error && error !== "") {
        isErrorVisible = true
    }


    const handleOnChange = event => {

        if(header === "Model urządzenia"){
            setSelectedModel(event);
        } else {
            setValue(event);
       }
    }

    let select;
    if (header === "Status" && assignedToValue === "-") {
        select = (<Select value={value} onChange={event => handleOnChange(event)} variant="outlined" className="middle-column-content">
                    <MenuItem key={"NEW"} value={"NEW"}>{"Nowy"}</MenuItem>
                  </Select>)
    } else {
        select = (<Select value={value} onChange={event => handleOnChange(event)} variant="outlined" className="middle-column-content">
                      {menuItems}
                 </Select>)
    }

    return (
        <div className="order-details-row">
            <div className="order-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="order-details-column">
                <FormControl style={{width: "100%"}} error={isErrorVisible}>
                    {select}
                    {isErrorVisible && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
            </div>
            <div style={{justifyContent: "center"}} className="order-details-column">
                {onButtonClick && <BaseButton text="Aktualizuj" onClick={onButtonClick} loading={loading}/>}
            </div>
        </div>
    );
};

export default OrderDetailsSelectRow;