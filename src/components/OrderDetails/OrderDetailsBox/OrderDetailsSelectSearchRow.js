import React, {useContext} from 'react';
import {Autocomplete, TextField, Typography} from "@mui/material";

const OrderDetailsSelectSearchRow = ({selectValuesMap, header, label, value, setValue, error, setAssignedBy,
                                         setAssignedByChanged}) => {
    return (
        <div className="order-details-row">
            <div className="order-details-column">
                <Typography variant="h6">{header}:</Typography>(
            </div>
            <div className="order-details-column">
                <Autocomplete options={selectValuesMap}
                              value={value}
                              onChange={(event, newValue) => {
                                  setValue(newValue)
                                  if(header === "Zadanie przypisane do" && newValue != value){
                                      setAssignedByChanged(true)
                                  }
                                 }}
                              fullWidth
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              renderInput={params => <TextField variant="outlined"
                                                                className="middle-column-content"
                                                                {...params}
                                                                label={label}
                                                                error={error && error !== ""}
                                                                helperText={error}/>}/>
            </div>
        </div>
    );
};

export default OrderDetailsSelectSearchRow;