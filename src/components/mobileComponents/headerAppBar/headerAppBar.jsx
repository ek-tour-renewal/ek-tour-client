import { AppBar, ButtonBase, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, makeStyles, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';
import { useState } from "react";

export default function HeaderAppBar() {

  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);

  const handleClickLogo = () => {
    navigate('/mobile');
  }

  const handleClickMenu = () => { setMenu(true); }
  const handleCloseMenu = () => { setMenu(false); }

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
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary='회사 소개' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}