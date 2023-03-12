import React from 'react';
import {Autocomplete, TextField, Typography} from "@mui/material";

const CreateOrderSelectSearchRow = ({selectValuesMap, header, setValue, error}) => {
    const options = Array.from(selectValuesMap, (value) => ({
        label: value.username,
        id: value.id
    }));

    return (
        <div className="order-details-row">
            <div className="order-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="order-details-column">
                <Autocomplete variant="outlined"
                              className="middle-column-content"
                              disablePortal
                              options={options}
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              onChange={(event, value) => setValue(value)}
                              renderInput={
                                  (params) =>
                                      <TextField variant="outlined"
                                                 className="middle-column-content"
                                                 {...params} label="Wybierz pracownika"
                                                 error={error && error !== ""}
                                                 helperText={error}/>}
                />
            </div>
        </div>
    );
};

export default CreateOrderSelectSearchRow;