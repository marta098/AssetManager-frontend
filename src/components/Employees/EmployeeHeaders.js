import React from 'react';
import {Typography} from "@mui/material";
import "./Employee.css"

const EmployeeHeaders = () => {
    return (
        <div className="employee-item">
            <div className="employee-property">
                <Typography variant="h6">Nazwa użytkownika</Typography>
            </div>
            <div className="employee-property">
                <Typography variant="h6">Email</Typography>
            </div>
            <div className="employee-property">
                <Typography variant="h6">Rola</Typography>
            </div>
            <div className="employee-property">
            </div>
        </div>
    );
};

export default EmployeeHeaders;