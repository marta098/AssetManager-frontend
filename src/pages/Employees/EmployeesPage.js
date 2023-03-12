import React from 'react';
import EmployeeList from "../../components/Employees/EmployeeList";
import "./EmployeesPage.css"

const EmployeesPage = () => {
    return (
        <div className="center" style={{width: "90%"}}>
            <EmployeeList/>
        </div>
    );
};

export default EmployeesPage;