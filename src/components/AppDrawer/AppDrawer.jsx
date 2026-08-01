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
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';
import InboxIcon from '@mui/icons-material/Inbox';
import configInstance from "../../utils/Config";
import Divider from '@mui/material/Divider';


export default function AppDrawer({ openDrawer, toggleDrawer, onExecPing, onExecTestDB, setCurSection }) {
    const theme = useTheme();
    const labelPing = "Esegui Ping Server";
    const labelTestDB = "Esegui Test DB";
    const localPrefix = "Component AppDrawer";
    const mainMenu = configInstance.getMainMenu();

    const getMenuIcon = (iconLabel) => {
        const iconSx = (theme) => ({ color: theme.palette.primary.main });
        switch (iconLabel) {
            case 'FlagIcon':
                return <FlagIcon  sx={iconSx} />;
            case 'MapIcon':
                return <MapIcon  sx={iconSx}  />;
            case 'MapsHomeWorkIcon':
                return <MapsHomeWorkIcon  sx={iconSx}  />;
            case 'LocationCityIcon':
                return <LocationCityIcon  sx={iconSx}  />;
            default:
                return <InboxIcon />;
        }
    }

    const handleActionPing = () => {
        //loggerInstance.debug(`${localPrefix} handleActionPing`);
        onExecPing();
    }

    const handleActionTestDB = () => {
        onExecTestDB();
    }

    const handleMainMenuClick = (code) => {
        setCurSection(code);
    };

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
            <Divider />
            <List>
                {mainMenu.map((item, index) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => handleMainMenuClick(item.actionCode)} >
                            <ListItemIcon>
                                {getMenuIcon(item.icon)}
                            </ListItemIcon>
                            <ListItemText primary={item.label}  sx={{ color: theme.palette.primary.main }} />
                        </ListItemButton>
                    </ListItem>
                ))}
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
