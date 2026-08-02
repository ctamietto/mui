import * as React from 'react';
import stateUIInstance from '../../ui/SingletonUIState';
import loggerInstance from '../../utils/Logger';
import { Paper, Box, Typography, InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

export default function NazioniSection({ setLoading, setOpenSuccess, setOpenError }) {
    const prefix = "Component App";

    // variables used by the data grid
    const [rows, setRows] = React.useState([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(7);
    const [sortField, setSortField] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState("");


    const columns = [
        {
            field: 'sigla_nazione', headerName: 'Sigla',
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: 'codice_belfiore', headerName: 'Codice Belfiore', width: 130,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: 'denominazione_nazione', headerName: 'Denominazione', width: 300,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: 'denominazione_cittadinanza', headerName: 'Cittadinanza', width: 300,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        }
    ];

    function renderDataGrid() {
        let dataGrid = <DataGrid
            sx={{ width: '99.5%', margin: '0 auto', marginTop: '5px', }}
            rows={rows}
            columns={columns}
            rowCount={rowCount}
            page={page}
            pageSize={pageSize}
            getRowId={(row) => row.sigla_nazione}
            disableColumnFilter
            pagination
            paginationMode="server"
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: pageSize,
                    },
                },
            }}
            onPaginationModelChange={(newPaginationModel) => {
                setPageSize(newPaginationModel.pageSize);
                setPage(newPaginationModel.page); // Reset to first page on pageSize change
            }}
            pageSizeOptions={[7, 10, 20, 30]}
            onSortModelChange={(newSortModel) => {
                if (newSortModel && newSortModel.length > 0) {
                    let sortField = newSortModel[0].field;
                    let subfix = "Fmt";
                    if (sortField.endsWith(subfix)) {
                        sortField = sortField.slice(0, - subfix.length);
                    }
                    let sortOrder = newSortModel[0].sort;
                    setSortField(sortField);
                    setSortOrder(sortOrder);
                } else {
                    setSortField("");
                    setSortOrder("");
                }
                setPage(0);
            }}

        />
        return dataGrid;
    }

    React.useEffect(() => {

        async function fetchData() {
            let localPrefix = ` ${prefix} function fetchData `;
            loggerInstance.debug(`${localPrefix} start`);

            try {

                let limit = pageSize;
                let offset = page * pageSize;

                let params = {
                    model: "comuni.gi_nazioni",
                    queryParams: {
                        offset: offset,
                        limit: limit,
                        sortField: sortField,
                        sortOrder: sortOrder
                    }
                };

                const resultData = await stateUIInstance.getList(setLoading,
                    setOpenSuccess,
                    setOpenError,
                    params);
                loggerInstance.debug(`${localPrefix} resultData : ${JSON.stringify(resultData)}`);
                if (resultData !== undefined && resultData !== null &&
                    resultData.list !== undefined && resultData.list !== null &&
                    resultData.list.length > 0
                ) {
                    setRows(resultData.list);
                    setRowCount(resultData.count);
                } else {
                    setRows([]);
                    setRowCount(0);
                }
                loggerInstance.debug(`${localPrefix} end`);
            } catch (error) {
                // Handle errors here
                let errorMessage = `${localPrefix} : ${error}`
                loggerInstance.error(errorMessage);
                throw error;
            }
        }
        fetchData();
    }, [page, pageSize, sortField, sortOrder]);


    function renderSearchBar() {
        const theme = useTheme();
        // Accessing the primary main color
        const primaryColor = theme.palette.primary.main;

        return (
            <Paper elevation={3} sx={{ padding: 1, width: '99.3%', margin: 1 }}>
                <Typography variant="h6" component="h2"
                    sx={{ fontWeight: "bold", marginTop: 0, marginBottom: 0, fontStyle: 'italic', color: primaryColor }}>
                    Nazioni
                </Typography>
                <Box
                    sx={{
                        padding: 0.5,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'start',  // horizontally
                        alignItems: 'center'       // vertically
                    }}
                >
                    <InputLabel id="company-select-label" sx={{ fontWeight: "bold", marginRight: 2, color: primaryColor }} >Denominazione</InputLabel>
                    <TextField id="denominazione_nazione" label="" variant="outlined" size="small" color="primary" />
                </ Box>
            </Paper>
        );
    }

    function renderNations() {

        return (<Box sx={{ height: "80vh", width: '100%' }}>
            {renderSearchBar()}
            {renderDataGrid()}
        </Box>)
    }

    return (
        <div style={{ width: '100%' }}>
            {renderNations()}
        </div>
    );
}
