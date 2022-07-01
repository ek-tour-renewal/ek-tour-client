import { Button } from "@mui/material";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MyEstimateV1 from '../myEstimate/myEstimateV1';
import RequestEstimateSlide from '../requestEstimate/requestEstimateSlide';
import styles from './header.module.css';

const Header = (props) => {
  const navigate = useNavigate();

  const [myOpen, setMyOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const handleClickMain = () => { navigate('/'); }
  const handleClickMyEstimate = () => { navigate('/estimate/my'); }

  const handleClickMyEstimateV1 = () => { setMyOpen(true); }
  const handleCloseMyEstimateV1 = () => { setMyOpen(false); }
  const handleOpenRequestEstimate = () => { setRequestOpen(true); };
  const handleCloseRequestEstimate = () => { setRequestOpen(false); };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <span onClick={handleClickMain}>
          <img className={styles.logo} src='http://52.79.242.242:8080/img/logo.png' alt='EK tour logo' />
        </span>
        <nav className={styles.navbarContainer}>
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
                  '&:hover': {color: '#EC9F46',
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
                  '&:hover': {color: '#EC9F46',
                    backgroundColor: 'rgba(255, 250, 203, 0.7)',
                    transform: 'scale(1.02)',
                  }
                }}
                onClick={handleClickMyEstimate}>
                나의견적확인
              </Button>
              <button className={styles.menuTitle} onClick={handleClickMyEstimateV1}>나의견적확인</button>
              <MyEstimateV1
                handleCloseMyEstimateV1={handleCloseMyEstimateV1}
                open={myOpen}
              />
            </li>
          </ul>
        </nav>
      </nav>
    </header>
  )
};

export default Header;
