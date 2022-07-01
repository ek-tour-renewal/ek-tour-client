import { Box } from '@mui/material';
import React, { useState } from 'react';
import MyEstimateV1 from '../myEstimate/myEstimateV1';
import styles from './header.module.css';

const Header = (props) => {
  const [myOpen, setMyOpen] = useState(false);

  const handleClickMain = () => { props.changeMode('MAIN'); }
  const handleClickCompany = () => { props.changeMode('COMPANY'); }
  const handleClickBusInfo = () => { props.changeMode('BUSINFO'); }
  const handleClickEstimateList = () => { props.changeMode('ESTIMATELIST'); }
  const handleClickRequestEstimate = () => { props.changeMode('REQUESTESTIMATE'); }
  const handleClickMyEstimate = () => { props.changeMode('MYESTIMATE'); }
  const handleClickServiceCenter = () => { props.changeMode('SERVICECENTER'); }

  const handleClickMyEstimateV1 = () => { setMyOpen(true); }
  const handleCloseMyEstimate = () => { setMyOpen(false); }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <span onClick={handleClickMain}>
          <img className={styles.logo} src='http://52.79.242.242:8080/img/logo.png' alt='EK tour logo' />
        </span>
        <nav className={styles.navbarContainer}>
          <ul className={styles.navbarMenu}>
            {/* 슬라이딩패널 */}
            <li className={styles.request}>
              <button className={styles.menuTitle} onClick={handleClickRequestEstimate}>견적요청하기</button>
            </li>
            <li className={styles.myEstimate}>
              <button className={styles.menuTitle} onClick={handleClickMyEstimateV1}>나의견적확인V1</button>
              <MyEstimateV1
                handleCloseMyEstimate={handleCloseMyEstimate}
                open={myOpen}
              />
              <button className={styles.menuTitle} onClick={handleClickMyEstimate}>나의견적확인</button>
            </li>
          </ul>
        </nav>
      </nav>
    </header>
  )
};

export default Header;
