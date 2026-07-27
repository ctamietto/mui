import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";


export default function SuccessSnackbar({ open , setOpen , successMessage}) {

    const handleCloseSuccess = (event, reason) => {
        let prefixMessage = "SuccessSnackbar handleCloseSuccess";
        console.log(` function ${prefixMessage} start `);
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        console.log(` function ${prefixMessage}} end `);
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }} variant="filled">
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
