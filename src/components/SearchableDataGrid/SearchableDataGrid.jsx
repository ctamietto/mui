import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import loggerInstance from '../../utils/Logger';
import stateUIInstance from '../../ui/SingletonUIState';


export default function SearchableDataGrid({ filters, setFilters ,setLoading, setOpenSuccess, setOpenError }) {
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
            field: 'denominazione_nazione', headerName: 'Denominazione', width: 400,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        },
        {
            field: 'denominazione_cittadinanza', headerName: 'Cittadinanza', width: 400,
            renderHeader: (params) => <strong>{params.colDef.headerName}</strong>
        }
    ];


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

                if (filters.length > 0) {
                    params.queryParams.filters = filters;
                }

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
    }, [page, pageSize, sortField, sortOrder, filters]);


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
