import React, {useContext, useEffect, useState} from 'react'
import {DataGrid, GridToolbarContainer, GridToolbarExport} from '@mui/x-data-grid'
import {getAllAssetOrders} from "../../services/order-service";
import {AuthContext} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import AssignOrderToEmployeeItDialog from "./AssignOrderToEmployeeItDialog";
import {getStatusArray, getTranslatedStatus, statusMap} from "../../utils/statusUtils";
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {formatDateWithoutTime, formatDateWithSeconds} from "../../utils/dateUtils";
import {getUsernameDisplay} from "../../utils/userUtils";

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(211,216,236,0.2)"
        }
    }
}));

const DataTable = () => {
    const [orderId, setOrderId] = useState("");
    const [assignOrderOpen, setAssignOrderOpen] = useState(false);
    const history = useHistory();
    const [tableData, setTableData] = useState([]);
    const {token} = useContext(AuthContext);
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const [completedRows] = useState([]);


    useEffect(() => {
        getAllAssetOrders(token)
            .then(data => setTableData(data));
    }, [token])

    const toggleDetailsDialog = () => {
        setAssignOrderOpen(!assignOrderOpen);
    }


    const columns = [
        {
            field: 'orderNumber',
            headerName: 'Numer zamówienia',
            flex: 1,
            sortable: true
        },
        {
            field: 'assignedTo',
            headerName: 'Przydział zadania',
            flex: 1,
            valueFormatter: ({value}) => value === null ? "" : getUsernameDisplay(value)
        },
        {
            field: 'assignmentDate',
            headerName: 'Data przydzielenia',
            flex: 1,
            valueFormatter: ({value}) => value == null ? "" : formatDateWithSeconds(value)
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            valueGetter: ({row}) => {
                if (row.status === 'COMPLETED') {
                    completedRows.push(row.id)
                }
                return (
                    getTranslatedStatus(row.status, row.deliveryType)
                )
            }
        },
        {
            field: 'changeHistory',
            headerName: 'Aktualizacja statusu',
            flex: 1,
            valueFormatter: ({value}) => value.map(e => formatDateWithSeconds(e.timestamp)).sort().reverse()[0]
        },
        {
            field: 'pickupDate',
            headerName: 'Data odbioru',
            flex: 1,
            valueFormatter: ({value}) => formatDateWithoutTime(value)
        },
        {
            field: 'asset',
            headerName: 'Numer seryjny',
            flex: 1,
            valueFormatter: ({value}) => value == null ? "" : value.serialNumber
        },
        {
            field: 'remark',
            headerName: 'Uwagi',
            flex: 1
        },
        {
            field: 'action',
            headerName: '',
            flex: 1,
            sortable: false,
            filterType: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <Button
                        disabled={completedRows.includes(params.id) ? true : false}
                        style={{backgroundColor: "#D40511"}}
                        variant="contained"
                        size="small"
                        onClick={toggleDetailsDialog}
                    >
                        Przydziel do
                    </Button>
                )
            }
        },
    ];

    const handleOnCellClick = (params) => {
        if (params.field === 'action') {
            setCurrentId(params.id)
            setOrderId(params.id);
        } else {
            history.push(`/main-page/orders/${params.id}`);
        }
    };

    const exportButton = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport
                    csvOptions={{
                        fileName: 'AssetManager-orders',
                        delimiter: ';',
                        utf8WithBom: true,
                    }}/>
            </GridToolbarContainer>
        );
    }

    const handleUpdateRow = (assignedToEmployeeIt, employeesIT, latestChange) => {

        setTableData((prevRows) => {

            for (let i = 0; i < employeesIT.length; i++) {

                let statusValue;
                if (assignedToEmployeeIt === null) {
                    statusValue = "Przekazano do realizacji"
                } else {
                    prevRows.map(row => { row.id === currentId ? statusValue = getTranslatedStatus(row.status, row.deliveryType)
                    : console.log("Error: selected row and current id from Data Table are not the same.")} )

                }
                if (employeesIT[i].id === assignedToEmployeeIt)
                    return prevRows.map(row =>
                        row.id === currentId ? {
                            ...row,
                            assignedTo: {username: getUsernameDisplay(employeesIT[i])},
                            status: statusValue,
                            assignmentDate: latestChange
                        } : row,
                    );
            }
        });
    };

    return (
        <div style={{height: 700, width: '100%'}}>
            <DataGrid
                style={{height: '90%', width: '98%'}}
                className={classes.root}
                rows={tableData}
                columns={columns}
                pageSize={10}
                rowsPerPage={5}
                rowsPerPageOptions={[10]}
                pagination
                onCellClick={handleOnCellClick}
                components={{
                    Toolbar: exportButton
                }}
                disableColumnSelector={true}
            />
            <AssignOrderToEmployeeItDialog
                onCellClick={handleOnCellClick}
                open={assignOrderOpen}
                orderId={orderId}
                columns={columns}
                toggleDialog={toggleDetailsDialog}
                updateAssignedTo={handleUpdateRow}
            />
        </div>
    )
};

export default DataTable;