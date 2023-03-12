import React, {useContext, useState} from 'react';
import {Box, Typography} from "@mui/material";
import GlobalVariableInputRow from "./GlobalVariableInputRow";
import './GlobalVariableBox.css';
import useInputState from "../../../hooks/useInputState";
import {updateCrestCode, updateDeprecation} from "../../../services/util-service";
import CustomSnackbar from "../../Commons/CustomSnackbar";
import {AuthContext} from "../../../contexts/AuthContext";
import useSnackbar from "../../../hooks/useSnackbar";

const GlobalVariableBox = ({crestCode, deprecation}) => {
    const {token} = useContext(AuthContext);
    const [crestCodeValue, setCrestCodeValue, , crestCodeError, setCrestCodeError] = useInputState(crestCode);
    const [deprecationValue, setDeprecationValue, , deprecationError, setDeprecationError] = useInputState(deprecation);
    const [isDeprecationLoading, setIsDeprecationLoading] = useState(false);
    const [isCrestLoading, setIsCrestLoading] = useState(false);
    const [snackbar, updateSnackbar, closeSnackbar, handleError] = useSnackbar();

    const handleUpdatingDeprecation = () => {
        setDeprecationError("");

        if (deprecationValue <= 0 || isNaN(deprecationValue)) {
            setDeprecationError("Amortyzacja nie może być mniejsza niż 1 miesiąc")
            return;
        }

        setIsDeprecationLoading(prevState => !prevState);

        const deprecationUpdate = {deprecationMonths: deprecationValue}
        updateDeprecation(deprecationUpdate, token)
            .then(() => updateSnackbar("Amortyzacja zaktualizowana!"))
            .catch(handleError)
            .finally(() => setIsDeprecationLoading(prevState => !prevState));
    }

    const handleUpdatingCrestCode = () => {
        setCrestCodeError("");

        if (!crestCodeValue || crestCodeValue === "") {
            setCrestCodeError("Crest code nie może być pusty");
            return;
        }

        setIsCrestLoading(prevState => !prevState);

        const crestCodeUpdate = {crestCode: crestCodeValue}
        updateCrestCode(crestCodeUpdate, token)
            .then(() => updateSnackbar("Crest kod zaktualizowany!"))
            .catch(handleError)
            .finally(() => setIsCrestLoading(prevState => !prevState));
    }

    return (
        <Box className="global-variable-div">
            <Box className="global-variable-box">
                <Typography sx={{alignSelf: "center"}} fontWeight={"bolder"} variant="h6">Zmienne globalne</Typography>
                <GlobalVariableInputRow header="Amortyzacja (w miesiącach)"
                                        value={deprecationValue}
                                        isNumeric={true}
                                        setValue={setDeprecationValue}
                                        buttonText={"Aktualizuj"}
                                        onButtonClick={handleUpdatingDeprecation}
                                        loading={isDeprecationLoading}
                                        error={deprecationError}/>
                <GlobalVariableInputRow header="Crest Kod"
                                        value={crestCodeValue}
                                        setValue={setCrestCodeValue}
                                        buttonText={"Aktualizuj"}
                                        onButtonClick={handleUpdatingCrestCode}
                                        loading={isCrestLoading}
                                        error={crestCodeError}/>
                <CustomSnackbar
                    open={snackbar.open}
                    type={snackbar.type}
                    onClose={closeSnackbar}
                    message={snackbar.message}/>
            </Box>
        </Box>
    );
};

export default GlobalVariableBox;