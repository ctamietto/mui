import * as React from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import stateInstance from '../../bo/SingletonState';
import SearchText from '../SearchText/SearchText';

export default function SearchBar({ filters, setFilters }) {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    const [denominazione, setDenominazione] = React.useState("");
    const [sigla, setSigla] = React.useState("");
    const [codiceBelfiore, setCodiceBelfiore] = React.useState("");
    const [denominazioneCittadinanza, setDenominazioneCittadinanza] = React.useState("");

    const handleChangeDenominazione = (event) => {
        let previousValueDenominazione = stateInstance.getFilterValue({ filters: filters, name: "denominazione_nazione" })
        if (previousValueDenominazione !== denominazione) {
            let localFilters = stateInstance.buildFilters({ filters: filters, name: "denominazione_nazione", operator: "contains", value: denominazione });
            setFilters(localFilters);
        }
    };

    const handleChangeDenominazioneCittadinanza = (event) => {
        let previousValueDenominazioneCittadinanza = stateInstance.getFilterValue({ filters: filters, name: "denominazione_cittadinanza" })
        if (previousValueDenominazioneCittadinanza !== denominazioneCittadinanza) {
            let localFilters = stateInstance.buildFilters({ filters: filters, name: "denominazione_cittadinanza", operator: "contains", value: denominazioneCittadinanza });
            setFilters(localFilters);
        }
    };

    const handleChangeSigla = (event) => {
        let previousValueSigla = stateInstance.getFilterValue({ filters: filters, name: "sigla_nazione" })
        if (previousValueSigla !== sigla) {
            let localFilters = stateInstance.buildFilters({ filters: filters, name: "sigla_nazione", operator: "contains", value: sigla });
            setFilters(localFilters);
        }
    };

    const handleChangeCodiceBelfiore = (event) => {
        let previousValueCodiceBelfiore = stateInstance.getFilterValue({ filters: filters, name: "codice_belfiore" })
        if (previousValueCodiceBelfiore !== codiceBelfiore) {
            let localFilters = stateInstance.buildFilters({ filters: filters, name: "codice_belfiore", operator: "contains", value: codiceBelfiore });
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
                    <SearchText
                        fieldValue={sigla}
                        setField={setSigla}
                        handleChangeField={handleChangeSigla}
                        nameField="Sigla"
                        idField="sigla_nazione"
                    />
                    <div style={{ width: "15px" }} />
                    <SearchText
                        fieldValue={codiceBelfiore}
                        setField={setCodiceBelfiore}
                        handleChangeField={handleChangeCodiceBelfiore}
                        nameField="Codice Belfiore"
                        idField="codice_belfiore"
                        //uppercase={false}
                    />
                    <div style={{ width: "15px" }} />
                    <SearchText
                        fieldValue={denominazione}
                        setField={setDenominazione}
                        handleChangeField={handleChangeDenominazione}
                        nameField="Denominazione"
                        idField="denominazione_nazione"
                    />
                    <div style={{ width: "15px" }} />
                    <SearchText
                        fieldValue={denominazioneCittadinanza}
                        setField={setDenominazioneCittadinanza}
                        handleChangeField={handleChangeDenominazioneCittadinanza}
                        nameField="Cittadinanza"
                        idField="denominazione_cittadinanza"
                    />
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ marginLeft: 'auto', height: 32 }}
                        onClick={() => {
                            setDenominazione('');
                            setSigla('');
                            setCodiceBelfiore('');
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
