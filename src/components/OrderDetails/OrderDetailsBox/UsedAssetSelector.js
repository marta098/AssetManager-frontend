import React from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";

const UsedAssetSelector = ({isNewAssetSelected, setIsNewAssetSelected}) => {
    return (
        <>
            <FormControl style={{display: "flex", flexDirection: "row", padding: 20}}>
                <Typography variant="h6" className="order-details-column">Urządzenie</Typography>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    className="order-details-column"
                >
                    <FormControlLabel
                        control={<Radio checked={!isNewAssetSelected} onChange={() => setIsNewAssetSelected(false)}/>}
                        label="Używane"/>
                    <FormControlLabel
                        control={<Radio checked={isNewAssetSelected} onChange={() => setIsNewAssetSelected(true)}/>}
                        label="Nowe"/>
                </RadioGroup>
            </FormControl>
        </>
    );
};

export default UsedAssetSelector;