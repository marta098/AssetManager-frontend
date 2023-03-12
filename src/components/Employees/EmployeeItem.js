import React, {useState} from 'react';
import "./Employee.css"
import "../../styles/styles.css"
import {MenuItem, Select, Typography} from "@mui/material";
import {translateRole} from "../../utils/roleUtils";
import BaseButton from "../Commons/BaseButton";
import useInputState from "../../hooks/useInputState";

const EmployeeItem = ({id, username, email, role, deleteUser, changeRole}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newRole, updateNewRole] = useInputState(role);

    const toggleIsEditing = () => {
        setIsEditing(!isEditing);
    }

    const handleEditing = () => {
        if (newRole === role) {
            toggleIsEditing();
            return;
        }
        changeRole(id, newRole)
            .then(toggleIsEditing);
    }

    const editingButton = isEditing ? <BaseButton text="Zatwierdź" color="#006300" onClick={handleEditing}/> :
        <BaseButton text="Edytuj" color="#e2ad00" onClick={toggleIsEditing}/>;

    const roleSelect = (
        <Select value={newRole} onChange={updateNewRole} variant="standard">
            <MenuItem value="ROLE_MANAGER_IT">Manager It</MenuItem>
            <MenuItem value="ROLE_EMPLOYEE_IT">Pracownik It</MenuItem>
            <MenuItem value="ROLE_MANAGER_DHL">Manager Dhl</MenuItem>
            <MenuItem value="ROLE_EMPLOYEE_DHL">Pracownik Dhl</MenuItem>
        </Select>)

    const roleComponent = isEditing ? roleSelect :
        <Typography variant="h6">{translateRole(role)}</Typography>

    return (
        <div>
            <li className="employee-item" style={{backgroundColor: 'rgba(215,215,215,0.22)'}}>
                <div className="employee-property">
                    <Typography variant="h6">{username}</Typography>
                </div>
                <div className="employee-property">
                    <Typography variant="h6">{email}</Typography>
                </div>
                <div className="employee-property">
                    {roleComponent}
                </div>
                <div className="employee-property">
                    {editingButton}
                    <BaseButton text="Usuń" onClick={() => deleteUser(id)}/>
                </div>
            </li>
        </div>
    );
};

export default EmployeeItem;