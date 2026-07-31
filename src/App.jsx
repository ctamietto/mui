import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import AppDrawer from './components/AppDrawer/AppDrawer';
import stateInstance from './bo/SingletonState'
import React from 'react';
import BlockingLoader from './components/BlockingLoader/BlockingLoader';
import ErrorSnackbar from './components/Snackbars/ErrorSnackbar';
import SuccessSnackbar from './components/Snackbars/SuccessSnackbar';
import stateUIInstance from './ui/SingletonUIState';

function App() {
  // gestione della visualizzazione del drawer 
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

   // gestione del loader su operazioni lunghe asincrone
  const [loading, setLoading] = React.useState(false);

   // gestione snackbar
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  async function onExecPing() {
    stateUIInstance.ping(setLoading, setOpenSuccess, setOpenError);
  }

  async function onExecTestDB() {
    stateUIInstance.testDB(setLoading, setOpenSuccess, setOpenError);
  }

  return (
    <AppBar position="static" >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestione Comuni
        </Typography>
      </Toolbar>
      <AppDrawer 
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        onExecPing={onExecPing}
        onExecTestDB={onExecTestDB}
      />
      <BlockingLoader loading={loading} />
      <ErrorSnackbar open={openError}
        setOpen={setOpenError}
        errorMessage={stateUIInstance.getGlobalVariables("errorMessage")} >
      </ErrorSnackbar>
      <SuccessSnackbar
        open={openSuccess}
        setOpen={setOpenSuccess}
        successMessage={stateUIInstance.getGlobalVariables("successMessage")} >
      </SuccessSnackbar>
    </AppBar>
  )
}
export default App
