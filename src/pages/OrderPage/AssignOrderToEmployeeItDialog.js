import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import useInputState from "../../hooks/useInputState";
import {updateAssignedEmployeeIt} from "../../services/order-service";
import {AuthContext} from "../../contexts/AuthContext";
import {FORBIDDEN, NOT_FOUND, UNAUTHORIZED} from "../../constants/http-statuses";
import {fetchAllUsersWithRole} from "../../services/user-service";

const AssignOrderToEmployeeItDialog = ({open, toggleDialog, orderId, updateAssignedTo}) => {
    const {token} = useContext(AuthContext);
    const [authorizationError, setAuthorizationError] = useState("");
    const [employeesIT, setEmployeesIT] = useState([]);
    const [assignedToEmployeeIt, updateAssignedToEmployeeIt, resetAssignedTo] = useInputState(null);
    const [roleNotFoundError, setRoleNotFoundError] = useState(false);

    const closeDialog = () => {
        resetAssignedTo();
        toggleDialog();
    }

    const handleUpdateChanges = async (event) => {
        event.preventDefault();
        toggleDialog();

        let latestChange = await
            updateAssignedEmployeeIt(assignedToEmployeeIt, token, orderId)
                .then((res) => res.data)
                .catch(error => {
                    if (error.response.status === UNAUTHORIZED || error.response.status === FORBIDDEN) {
                        setAuthorizationError(error.response.data.description);
                    }
                })

        updateAssignedTo(assignedToEmployeeIt, employeesIT, latestChange);
    }

    useEffect(() => {
        fetchAllUsersWithRole("ROLE_EMPLOYEE_IT", token)
            .then((data) => setEmployeesIT(data))
            .catch(error => {
                if (error.response.status === NOT_FOUND) {
                    setRoleNotFoundError(true);
                } else if (error.response.status === UNAUTHORIZED || error.response.status === FORBIDDEN) {
                    setAuthorizationError(error.response.data.description);
                }
            })
    }, [])

    const getMappedEmployeesIT = employeesIT.map(employeeIT =>
        <MenuItem value={employeeIT.id} key={employeeIT.id}>
            {employeeIT.username}
        </MenuItem>);

    return (
        <Dialog open={open} onClose={closeDialog} fullWidth={true}>
            <DialogTitle>
                {"Przypisz do"}
            </DialogTitle>
            <DialogContent>
                <Box component="form">
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="assigned-to">Przypisz do</InputLabel>
                        <Select labelId="assigned-to"
                                label="Przypisz do"
                                value={assignedToEmployeeIt === null ? '' : assignedToEmployeeIt}
                                onChange={updateAssignedToEmployeeIt}>
                            {getMappedEmployeesIT}
                        </Select>
                        <Box style={{color: "#D40511"}}>
                            {authorizationError ? "Musisz być zalogowany!" : ""}
                        </Box>
                        <Box style={{color: "#D40511"}}>
                            {roleNotFoundError ? "Twoja rola nie została znaleziona!" : ""}
                        </Box>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={closeDialog}>Anuluj</Button>
                <Button variant="outlined" onClick={handleUpdateChanges}>Zapisz</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignOrderToEmployeeItDialog;