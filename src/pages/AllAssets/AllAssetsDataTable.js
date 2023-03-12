import React, {useContext, useEffect, useState} from 'react'
import {DataGrid, GridToolbarContainer, GridToolbarExport, useGridApiRef} from '@mui/x-data-grid'
import {AuthContext} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {fetchAllAssets} from "../../services/asset-service";
import {getTranslatedModel} from "../../utils/modelUtils";
import {formatDateWithSeconds} from "../../utils/dateUtils";

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(211,216,236,0.24)"
        }
    }
}));

const DataTable = () => {
    const {token} = useContext(AuthContext);
    const [tableData, setTableData] = useState([]);
    const [finalClickInfo] = useState([]);
    const apiRef = useGridApiRef();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        fetchAllAssets(token)
            .then(data => setTableData(data));
    }, [token])

    const columns = [
        {
            field: 'serialNumber',
            headerName: 'Numer seryjny',
            flex: 1
        },
        {
            field: 'model',
            headerName: 'Model',
            flex: 1,
            sortable: true,
            valueFormatter: ({value}) => getTranslatedModel(value)
        },
        {
            field: 'mpkNumber',
            headerName: 'Numer MPK',
            flex: 1
        },
        {
            field: 'deprecation',
            headerName: 'Amortyzacja',
            flex: 1,
            valueFormatter: ({value}) => formatDateWithSeconds(value)
        },
        {
            field: 'name',
            headerName: 'Nazwa',
            flex: 1
        },
        {
            field: 'currentUser',
            headerName: 'Aktualny użytkownik',
            flex: 1,
            valueFormatter: ({value}) => value === null ? "-" : value.email
        },
        {
            field: 'createdBy',
            headerName: 'Przypisany do menadżera',
            flex: 1,
            valueFormatter: ({value}) => value === null ? "-" : value.email
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            valueFormatter: ({value}) => value === "IN_USE" ? "W użyciu" : "W magazynie"
        },
    ];

    const handleOnCellClick = params => {
        history.push(`/main-page/asset/${params.id}`);
    };

    const exportButton = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport
                    csvOptions={{
                        fileName: 'AssetManager-allAssets',
                        delimiter: ';',
                        utf8WithBom: true,
                    }}/>
            </GridToolbarContainer>
        );
    }

    return (
        <div style={{height: 700, width: '100%'}}>
            <DataGrid
                apiRef={apiRef}
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
            {finalClickInfo.field}
        </div>
    )
}

export default DataTable;