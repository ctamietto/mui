import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

let setOpenErrorSnackbar = null;

const handleCloseError = (event, reason) => {
    let prefixMessage = "ErrorSnackbar handleCloseError";
    console.log(` function ${prefixMessage} start `);
    if (reason === "clickaway") {
        return;
    }
    setOpenErrorSnackbar(false);
    console.log(` function ${prefixMessage}} end `);
};

export default function ErrorSnackbar({ open, setOpen, errorMessage }) {
    setOpenErrorSnackbar = setOpen;
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }} variant="filled">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
