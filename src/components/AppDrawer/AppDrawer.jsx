import loggerInstance from "../../utils/Logger";
import { Box } from "@mui/material";
import { List } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import DatabaseIcon from '@mui/icons-material/Storage';
import { Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";



export default function AppDrawer({ openDrawer, toggleDrawer,onExecPing,onExecTestDB }) {
    const theme = useTheme();
    const labelPing = "Esegui Ping Server";
    const labelTestDB = "Esegui Test DB";
    const localPrefix = "Component AppDrawer";

    const handleActionPing = () => {
        //loggerInstance.debug(`${localPrefix} handleActionPing`);
        onExecPing();
    }

    const handleActionTestDB = () => {
        onExecTestDB();
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
                <ListItem key={labelPing} disablePadding>
                    <ListItemButton onClick={() => handleActionTestDB()} >
                        <ListItemIcon>
                            <DatabaseIcon sx={{ color: theme.palette.primary.main }} ></DatabaseIcon>
                        </ListItemIcon>
                        <ListItemText primary={labelTestDB} sx={{ color: theme.palette.primary.main }} />
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
