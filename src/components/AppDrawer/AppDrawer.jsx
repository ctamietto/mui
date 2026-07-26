import loggerInstance from "../../utils/Logger";
import { Box } from "@mui/material";
import { List } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import { Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";


let onExecPingLocal = null;

export default function AppDrawer({ openDrawer, toggleDrawer,onExecPing }) {
    const theme = useTheme();
    const labelPing = "Esegui Ping Server";
    const localPrefix = "Component AppDrawer";
    const onExecPingLocal = onExecPing;

    const handleActionPing = () => {
        //loggerInstance.debug(`${localPrefix} handleActionPing`);
        onExecPingLocal();
    }


    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={labelPing} disablePadding>
                    <ListItemButton onClick={() => handleActionPing()} >
                        <ListItemIcon>
                            <NetworkPingIcon sx={{ color: theme.palette.primary.main }} ></NetworkPingIcon>
                        </ListItemIcon>
                        <ListItemText primary={labelPing} sx={{ color: theme.palette.primary.main }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}
