import { AppBar, Box, ButtonBase, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, makeStyles, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useState } from "react";

export default function HeaderAppBar() {

  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);

  const handleClickLogo = () => {
    setMenu(false);
    navigate('/mobile');
  }

  const handleClickMenu = () => { setMenu(!menu); }
  const handleCloseMenu = () => { setMenu(false); }

  const handleClickMyEstimate = () => { navigate('/mobile/myestimate'); handleCloseMenu(); }
  const handleClickServiceCenter = () => { navigate('/mobile/service-center'); handleCloseMenu(); }

  return (
    <>
      <CssBaseline />
      <AppBar style={{zIndex: '1251', backgroundColor: '#ffb450', position: 'sticky', top: 0}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <ButtonBase sx={{width: 120}} onClick={handleClickLogo}>
            <img width='120px' src='http://52.79.242.242:8080/img/logo.png' alt='EK tour Logo' />
          </ButtonBase>
          <IconButton size="large" onClick={handleClickMenu} color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer open={menu} onClose={handleCloseMenu} anchor='top' style={{zIndex: '1250'}}>
        <Box m={3.4} />
        <List>
          {/* <Divider /> */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleClickMyEstimate}>
              <ListItemIcon>
                <ContentPasteSearchIcon />
              </ListItemIcon>
              <ListItemText primary='내 견적 확인' />
            </ListItemButton>
          </ListItem>
          {/* <Divider /> */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleClickServiceCenter}>
              <ListItemIcon>
                <SupportAgentIcon />
              </ListItemIcon>
              <ListItemText primary='고객센터' />
            </ListItemButton>
          </ListItem>
        </List>
        <IconButton onClick={handleCloseMenu}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </Drawer>
    </>
  );
}