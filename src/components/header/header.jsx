import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';

const Header = memo((props) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const onOpenMenu = () => {
    setActive(!active);
  };

  const onNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className={styles.header}>
      <section className={styles.headerMyEstimate}>
        <button className={styles.headerMyEstimateButton} onClick={() => onNavigate('/my')}>내견적확인</button>
      </section>
      <nav className={styles.navbar}>
        <span onClick={() => onNavigate('/')}>
          <img className={styles.logo} src='http://52.79.242.242:8080/img/logo.png' alt='EK tour logo' />
        </span>
        <div className={styles.navbarContainer}>
          <ul className={!active ? styles.navbarMenu : styles.hiddenNavbarMenu}>
            <li className={styles.introduce}>
              <button className={styles.menuTitle} onClick={() => onNavigate('/introduce')}>회사소개</button>
            </li>
            <li className={styles.busNotice} >
              <button className={styles.menuTitle} onClick={() => onNavigate('/bus')}>버스안내</button>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => onNavigate('/bus')}>버스안내</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => onNavigate('/smallBus')}>25인승 소형</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => onNavigate('/limousine')}>28인승 리무진</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => onNavigate('/bigBus')}>45인승 대형</button></li>
              </ul>
            </li>
            <li className={styles.request}>
              <button className={styles.menuTitle} onClick={() => onNavigate('/list')}>견적요청</button>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => onNavigate('/list')}>견적요청목록</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => onNavigate('/request')}>견적요청하기</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => onNavigate('/my')}>나의견적확인</button></li>
              </ul>
            </li>
            <li className={styles.service}>
              <button className={styles.menuTitle} onClick={() => onNavigate('/service')}>고객센터</button>
            </li>
          </ul>
        </div>
        <button className={styles.toggle} onClick={onOpenMenu}>
          <i className='fa-solid fa-bars'></i>
        </button>
      </nav>
    </header>
  )
});

export default Header;
