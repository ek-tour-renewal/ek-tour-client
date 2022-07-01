import { AppBar, Button } from '@mui/material';
import React, { useState } from 'react';
import MyEstimateV1 from '../myEstimate/myEstimateV1';
import RequestEstimateSlide from '../requestEstimate/requestEstimateSlide';
import styles from './header.module.css';

const Header = (props) => {
  const [myOpen, setMyOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const handleClickMain = () => { props.changeMode('MAIN'); }
  const handleClickCompany = () => { props.changeMode('COMPANY'); }
  const handleClickBusInfo = () => { props.changeMode('BUSINFO'); }
  const handleClickEstimateList = () => { props.changeMode('ESTIMATELIST'); }
  const handleClickRequestEstimate = () => { props.changeMode('REQUESTESTIMATE'); }
  const handleClickServiceCenter = () => { props.changeMode('SERVICECENTER'); }

  const handleClickMyEstimate = () => { setMyOpen(true); }
  const handleCloseMyEstimate = () => { setMyOpen(false); }
  const handleOpenRequestEstimate = () => { setRequestOpen(true); };
  const handleCloseRequestEstimate = () => { setRequestOpen(false); };

  return (
    <AppBar 
    sx={{
      borderTop: '4px solid #EC9F46',
      backgroundColor: '#FCFCFC',
      userSelect: 'none',
      position: 'sticky',
      top: 0,
      paddingBottom: '2em'
    }}>
      <nav className={styles.navbar}>
        <span onClick={handleClickMain}>
          <img className={styles.logo} src='http://52.79.242.242:8080/img/logo.png' alt='EK tour logo' />
        </span>
        <div className={styles.navbarContainer}>
          <ul className={styles.navbarMenu}>
            <li className={styles.request}>
              <Button
                sx={{
                  border: 'none',
                  backgroundColor: 'unset',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  color: '#5A4231',
                  marginRight: '1em',
                  marginBottom: '0.5em',
                  transition: '0.5s',
                  '&:hover': {
                    color: '#EC9F46',
                    backgroundColor: 'rgba(255, 250, 203, 0.7)',
                    transform: 'scale(1.02)',
                  }
                }}
                onClick={handleOpenRequestEstimate}>
                견적요청하기
              </Button>
              <RequestEstimateSlide
                handleCloseRequestEstimate={handleCloseRequestEstimate}
                open={requestOpen}
                menu={props.menu}
                changeMenu={props.changeMenu}
                Ref={props.Ref}
                getData={props.getData}
              />
            </li>
            <li className={styles.myEstimate}>
              <Button
                sx={{
                  border: 'none',
                  backgroundColor: 'unset',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  color: '#5A4231',
                  marginRight: '1em',
                  marginBottom: '0.5em',
                  transition: '0.5s',
                  '&:hover': {
                    color: '#EC9F46',
                    backgroundColor: 'rgba(255, 250, 203, 0.7)',
                    transform: 'scale(1.02)',
                  }
                }}
                onClick={handleClickMyEstimate}>
                나의견적확인
              </Button>
              <MyEstimateV1
                myRef={props.myRef}
                checkMyEstimate={props.checkMyEstimate}
                handleCloseMyEstimate={handleCloseMyEstimate}
                open={myOpen}
              />
            </li>
          </ul>
        </div>
      </nav>
    </AppBar>
  )
};

export default Header;
