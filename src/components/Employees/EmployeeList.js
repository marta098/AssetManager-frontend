import React, {useContext, useEffect, useState} from 'react';
import "./Employee.css"
import EmployeeItem from "./EmployeeItem";
import {changeRole, deleteUser, fetchAllUsers} from "../../services/user-service";
import {AuthContext} from "../../contexts/AuthContext";
import EmployeeHeaders from "./EmployeeHeaders";
import useInputState from "../../hooks/useInputState";
import {TextField} from "@mui/material";
import CustomSnackbar from "../Commons/CustomSnackbar";
import useSnackbar from "../../hooks/useSnackbar";

const EmployeeList = () => {
    const [users, setUsers] = useState([]);
    const {token, getUser} = useContext(AuthContext);
    const [filter, updateFilter] = useInputState("");
    const [snackbar, updateSnackbar, closeSnackbar, handleError] = useSnackbar();

    useEffect(() => {
        fetchAllUsers(token)
            .then(filterCurrentUser)
            .then(setUsers);
    }, [])

    const handleDeletingEmployee = userId => {
        deleteUser(token, userId)
            .then(() => filterUser(userId))
            .then(() => updateSnackbar("Pracownik usunięty"))
            .catch(handleError)
    }

    const handleChangingRole = (userId, role) => {
        return changeRole(token, userId, role)
            .then(() => changeUserRole(userId, role))
            .then(() => updateSnackbar("Rola zmieniona"))
            .catch(handleError)
    }

    const changeUserRole = (userId, role) => {
        const newUsers = [...users];
        const userIndex = newUsers.findIndex(user => user.id === userId);
        const changedUser = newUsers[userIndex];
        changedUser.role = role;
        newUsers[userIndex] = changedUser;
        setUsers(newUsers);
    }

    const filterUser = userId => {
        const usersFiltered = users.filter(user => user.id !== userId);
        setUsers(usersFiltered);
    }

    const filterCurrentUser = users => {
        return users.filter(user => user.id !== getUser().id)
    }

    const employees = users.filter(user => user.username.toLowerCase().startsWith(filter.toLowerCase()))
        .map(user => <EmployeeItem key={user.id}
                                   deleteUser={handleDeletingEmployee}
                                   changeRole={handleChangingRole}
                                   {...user}/>)
    return (
        <ul className="employee-list">
            <TextField
                margin="normal"
                label="Nazwa użytkownika"
                value={filter}
                onChange={updateFilter}
            />
            <EmployeeHeaders/>
            {employees}
            <CustomSnackbar
                open={snackbar.open}
                type={snackbar.type}
                onClose={closeSnackbar}
                message={snackbar.message}/>
        </ul>
    );
};

export default EmployeeList;