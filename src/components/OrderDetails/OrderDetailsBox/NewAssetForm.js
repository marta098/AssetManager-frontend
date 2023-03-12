import React from 'react';
import OrderDetailsInputRow from "./OrderDetailsInputRow";
import OrderDetailsSelectRow from "./OrderDetailsSelectRow";
import OrderDetailsDateRow from "./OrderDetailsDateRow";

const NewAssetForm = ({
                          models,
                          locations,
                          newAssetSerialNumber,
                          setNewAssetSerialNumber,
                          newAssetDeprecation,
                          setNewAssetDeprecation,
                          newAssetLocation,
                          errors,
                          setNewAssetLocation,
                          newAssetName,
                          setNewAssetName,
                          requestedModelValue,
                          setRequestedModelValue
                      }) => {
    return (
        <>
            <OrderDetailsInputRow header="Numer seryjny"
                                  value={newAssetSerialNumber}
                                  setValue={setNewAssetSerialNumber}
                                  error={errors.serialNumberError}/>
            <OrderDetailsSelectRow header="Model urządzenia"
                                   value={requestedModelValue}
                                   setValue={setRequestedModelValue}
                                   selectValuesMap={models}
                                   error={errors.requestedModelError}/>
            <OrderDetailsDateRow header="Data amortyzacji"
                                 value={newAssetDeprecation}
                                 changeValue={setNewAssetDeprecation}
                                 error={errors.deprecationError}/>
            <OrderDetailsSelectRow header="Lokalizacja"
                                   value={newAssetLocation}
                                   setValue={setNewAssetLocation}
                                   selectValuesMap={locations}
                                   error={errors.locationError}/>
            <OrderDetailsInputRow header="Nazwa"
                                  value={newAssetName}
                                  setValue={setNewAssetName}
                                  error={errors.nameError}/>
        </>
    );
};

export default NewAssetForm;