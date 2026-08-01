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
import loggerInstance from './utils/Logger';
import ComuniSection from './components/sections/ComuniSection';
import ProvinceSection from './components/sections/ProvinceSection';
import RegioniSection from './components/sections/RegioniSection';
import NazioniSection from './components/sections/NazioniSection';

function App() {
  const prefix = "Component App";

  // gestione relativa alla visualizzazione della sezione corrente
  const [curSection, setCurSection] = React.useState('NAZIONI');

  // used to check that use effect run only once
  const didInit = React.useRef(false);

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

  function renderSection(sectionCode) {
    let sectionContent = "";
    switch (sectionCode) {
      case 'NAZIONI':
        sectionContent = <NazioniSection  setLoading={setLoading} setOpenError={setOpenError} setOpenSuccess={setOpenSuccess}  ></NazioniSection>
        break;
      case 'REGIONI':
        sectionContent = <RegioniSection></RegioniSection>
        break;
      case 'PROVINCIE':
        sectionContent = <ProvinceSection></ProvinceSection>
        break;
      case 'COMUNI':
        sectionContent = <ComuniSection></ComuniSection>
        break;
    }
    return sectionContent;
  }

  function getFullContent() {
    return <div>
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
          setCurSection={setCurSection}
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
      {renderSection(curSection)}
    </div>
  }
  let content = getFullContent();

  // this code that follow try to initialize the app 
  let applicationInitialized = stateUIInstance.getGlobalVariables("applicationInitialized")
  if (applicationInitialized === false) {
    // the app is not initialized
    // set a load indicator to indicate that the app is initializing 
    content = <BlockingLoader loading={loading} />;
    if (loading === false) {
      setLoading(true);
    }
  } 

  // use effect should start only once and initialize the application awaiting the initialization procedure to end
  // the remove the load indicator e render the full application
  React.useEffect(() => {
    const init = async () => {
      if (didInit.current) return;
      didInit.current = true;

      let localPrefix = ` ${prefix} function useEffect `;
      loggerInstance.debug(`${localPrefix} start`);

      let applicationInitialized = stateUIInstance.getGlobalVariables("applicationInitialized")
      if (applicationInitialized === false) {
        loggerInstance.debug(`${localPrefix} application to initialize `);
        // tento di inizializzare l'applicazione
        await stateUIInstance.initializeApplication();
        stateUIInstance.setGlobalVariables("applicationInitialized", true)
        content = getFullContent();
        setLoading(false);
      }
      loggerInstance.debug(`${localPrefix} end`);
    };

    init();
  }, []);

  return (
    content
  )
}
export default App
