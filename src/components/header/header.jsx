import React, { useState } from 'react';
import MyEstimateV1 from '../myEstimate/myEstimateV1';
import styles from './header.module.css';

const Header = (props) => {
  const [active, setActive] = useState(false);
  const [myOpen, setMyOpen] = useState(false);

  const onOpenMenu = () => {
    setActive(!active);
  };

  const handleClickMain = () => { props.changeMode('MAIN'); }
  const handleClickCompany = () => { props.changeMode('COMPANY'); }
  const handleClickBusInfo = () => { props.changeMode('BUSINFO'); }
  const handleClickEstimateList = () => { props.changeMode('ESTIMATELIST'); }
  const handleClickRequestEstimate = () => { props.changeMode('REQUESTESTIMATE'); }
  const handleClickServiceCenter = () => { props.changeMode('SERVICECENTER'); }

  const handleClickMyEstimate = () => { setMyOpen(true); }
  const handleCloseMyEstimate = () => { setMyOpen(false); }

  return (
    <header className={styles.header}>
      <section className={styles.headerMyEstimate}>
        <button className={styles.headerMyEstimateButton} onClick={handleClickMyEstimate}>내견적확인</button>  
        <MyEstimateV1
          myRef={props.myRef}
          checkMyEstimate={props.checkMyEstimate}
          handleCloseMyEstimate={handleCloseMyEstimate}
          open={myOpen}
        />
      </section>
      <nav className={styles.navbar}>
        <span onClick={handleClickMain}>
          <img className={styles.logo} src='http://52.79.242.242:8080/img/logo.png' alt='EK tour logo' />
        </span>
        <div className={styles.navbarContainer}>
          <ul className={!active ? styles.navbarMenu : styles.hiddenNavbarMenu}>
            <li className={styles.introduce}>
              <button className={styles.menuTitle} onClick={handleClickCompany}>회사소개</button>
            </li>
            <li className={styles.busNotice} >
              <button className={styles.menuTitle} onClick={handleClickBusInfo}>버스안내</button>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><button className={styles.subMenu}>버스안내</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu}>25인승 소형</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu}>28인승 리무진</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu}>45인승 대형</button></li>
              </ul>
            </li>
            <li className={styles.request}>
              <button className={styles.menuTitle} onClick={handleClickRequestEstimate}>견적요청</button>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={handleClickEstimateList}>견적요청목록</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={handleClickRequestEstimate}>견적요청하기</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu}>나의견적확인</button></li>
              </ul>
            </li>
            <li className={styles.service}>
              <button className={styles.menuTitle} onClick={handleClickServiceCenter}>고객센터</button>
            </li>
          </ul>
        </div>
        <button className={styles.toggle} onClick={onOpenMenu}>
          <i className='fa-solid fa-bars'></i>
        </button>
      </nav>
    </header>
  )
};

export default Header;
