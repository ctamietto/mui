import * as React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchBar from '../SearchBar/SearchBar';
import SearchableDataGrid from '../SearchableDataGrid/SearchableDataGrid';

export default function NazioniSection({ setLoading, setOpenSuccess, setOpenError }) {
    const prefix = "Component App";

    const [filters, setFilters] = React.useState([]);

    return (<Box sx={{ height: "80vh", width: '100%' }}>
        <SearchBar
            filters={filters}
            setFilters={setFilters}
        />
        <SearchableDataGrid
            filters={filters}
            setFilters={setFilters}
            setLoading={setLoading}
            setOpenError={setOpenError}
            setOpenSuccess={setOpenSuccess}
        />
    </Box>)
}
