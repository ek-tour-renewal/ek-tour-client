import React, { memo } from 'react';
import { useState } from 'react';
import styles from './header.module.css';

const Header = memo(({ logoURL }) => {
  const [active, setActive] = useState(false);

  const onOpenMenu = () => {
    setActive(!active);
  };

  return (
    <header className={styles.header}>
      <section className={styles.headerMyEstimate}>
        <a className={styles.headerMyEstimateButton} href='/search'>내견적확인</a>
      </section>
      <nav className={styles.navbar}>
        <a href='/'>
          <img src={logoURL} alt='EK tour logo' className={styles.logo} />
        </a>
        <div className={styles.container}>
          <ul className={!active ? styles.navbarMenu : styles.hiddenNavbarMenu}>
            <li className={styles.introduce}>
              <a className={styles.menuTitle} href='/introduce'>회사소개</a>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/introduce'>CEO 인사말</a></li>
              </ul>
            </li>
            <li className={styles.busNotice} >
              <a className={styles.menuTitle} href='/notice'>버스안내</a>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/notice'>버스안내</a></li>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/smallbus'>25인승 소형</a></li>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/limousine'>28인승 리무진</a></li>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/bigbus'>45인승 대형</a></li>
              </ul>
            </li>
            <li className={styles.request}>
              <a className={styles.menuTitle} href='/list'>견적요청</a>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/list'>견적요청목록</a></li>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/request'>견적요청하기</a></li>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/search'>나의견적확인</a></li>
              </ul>
            </li>
            <li className={styles.service}>
              <a className={styles.menuTitle} href='/service'>고객센터</a>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/service'>고객센터</a></li>
              </ul>
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
