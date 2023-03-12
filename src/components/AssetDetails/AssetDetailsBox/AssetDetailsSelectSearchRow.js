import React from 'react';
import {Autocomplete, TextField, Typography} from "@mui/material";

const AssetDetailsSelectSearchRow = ({selectValuesMap, value, header, setValue, status}) => {
    let autocomplete;
    if ((status === "IN_USE" && header === "Magazyn")) {
        autocomplete = <Autocomplete variant="outlined" className="middle-column-content"
                                     value={null}
                                     disabled
                                     options={selectValuesMap}
                                     onChange={(event, newValue) => setValue(newValue)}
                                     isOptionEqualToValue={(option, value) => option.id === value.id}
                                     renderInput={
                                         (params) =>
                                             <TextField variant="outlined" className="middle-column-content"
                                                        {...params} label={header}/>}
        />
    } else if ((status === "IN_STOCK" && header === "Lokalizacja")) {
        autocomplete = <Autocomplete variant="outlined" className="middle-column-content"
                                     value={null}
                                     disabled
                                     options={selectValuesMap}
                                     onChange={(event, newValue) => setValue(newValue)}
                                     isOptionEqualToValue={(option, value) => option.id === value.id}
                                     renderInput={
                                         (params) =>
                                             <TextField variant="outlined" className="middle-column-content"
                                                        {...params} label={header}/>}
        />
    } else if ((status === "IN_STOCK" && header === "Urządzenie przypisane do")) {
        autocomplete = <Autocomplete variant="outlined" className="middle-column-content"
                                     value={null}
                                     disabled
                                     options={selectValuesMap}
                                     onChange={(event, newValue) => setValue(newValue)}
                                     isOptionEqualToValue={(option, value) => option.id === value.id}
                                     renderInput={
                                         (params) =>
                                             <TextField variant="outlined" className="middle-column-content"
                                                        {...params} label={header}/>}
        />
    } else {
        autocomplete = <Autocomplete variant="outlined" className="middle-column-content"
                                     value={value}
                                     options={selectValuesMap}
                                     onChange={(event, newValue) => setValue(newValue)}
                                     isOptionEqualToValue={(option, value) => option.id === value.id}
                                     renderInput={
                                         (params) =>
                                             <TextField variant="outlined" className="middle-column-content"
                                                        {...params} label={header}/>}
        />
    }

    return (
        <div className="asset-details-row">
            <div className="asset-details-column">
                <Typography variant="h6">{header}:</Typography>
            </div>
            <div className="asset-details-column">
                {autocomplete}
            </div>
        </div>
    );
};

export default AssetDetailsSelectSearchRow;