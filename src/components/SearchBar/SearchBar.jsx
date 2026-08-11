import * as React from 'react';
import { Paper, Box, Typography, InputLabel, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import stateInstance from '../../bo/SingletonState';

export default function SearchBar({ filters, setFilters }) {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    const [denominazione, setDenominazione] = React.useState("");

    const handleChangeDenominazione = (event) => {
        let previousValueDenominazione = stateInstance.getFilterValue({ filters: filters, name: "denominazione_nazione" })
        if (previousValueDenominazione !== denominazione) {
            let localFilters = stateInstance.buildFilters({ filters: filters, name: "denominazione_nazione", operator: "contains", value: denominazione });
            setFilters(localFilters);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 1, width: '99.3%', margin: 1 }}>
            <Typography variant="h6" component="h2"
                sx={{ fontWeight: "bold", marginTop: 0, marginBottom: 0, fontStyle: 'italic', color: primaryColor }}>
                Nazioni
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
                    <TextField
                        id="denominazione_nazione"
                        label=""
                        variant="outlined"
                        size="small"
                        color="primary"
                        value={denominazione}
                        sx={{
                            '& .MuiInputBase-input': {
                                padding: '6px 8px',  // ← Reduce padding (default is ~8px 14px)
                                fontSize: '1rem'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0, 0, 0, 0.23)'
                            }
                        }}
                        onChange={(e) => {
                            let value = event.target.value;
                            if (value === undefined || value === null) {
                                value = "";
                            }
                            if (value !== "") {
                                value = value.toUpperCase();
                            }
                            setDenominazione(e.target.value)
                        }}
                        onBlur={handleChangeDenominazione} />
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ marginLeft: 'auto', height: 32 }}
                        onClick={() => {
                            setDenominazione('');
                            setFilters([]);
                        }}
                    >
                        Pulisci
                    </Button>
                </ Box>
            </Typography>
        </Paper>

    );
}
