import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyEstimateV1 from '../myEstimate/myEstimateV1';
import styles from './header.module.css';

const Header = (props) => {
  const [myOpen, setMyOpen] = useState(false);
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  const handleClickMyEstimate = () => { setMyOpen(true); }
  const handleCloseMyEstimate = () => { setMyOpen(false); }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <span onClick={() => onNavigate('/')}>
          <img className={styles.logo} src='http://52.79.242.242:8080/img/logo.png' alt='EK tour logo' />
        </span>
        <div className={styles.navbarContainer}>
          <ul className={styles.navbarMenu}>
            {/* 슬라이딩패널 */}
            <li className={styles.request}>
              <button className={styles.menuTitle}>견적요청하기</button>
            </li>
            <li className={styles.myEstimate}>
              <button className={styles.menuTitle} onClick={handleClickMyEstimate}>나의견적확인</button>
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
    </header>
  )
};

export default Header;
