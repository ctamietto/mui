import { useTheme } from '@mui/material/styles';
import { InputLabel, TextField,Box } from '@mui/material';

export default function SearchText({ fieldValue, setField, handleChangeField, nameField , idField, uppercase = true }) {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
            }}
        >   
            <InputLabel sx={{ fontWeight: "bold", paddingRight: 1, color: primaryColor }} >{nameField}</InputLabel>
            <TextField
                id={idField}
                //id="denominazione_nazione"
                label=""
                variant="outlined"
                size="small"
                color="primary"
                value={fieldValue}
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
                        if (uppercase === true) {
                            value = value.toUpperCase();
                        }
                    }
                    setField(value)
                }}
                onBlur={handleChangeField}
            />
        </Box>
    );
}
