import React from 'react';
import styles from './header.module.css';

const Header = props => {
  return (
    <header className={styles.header}>
      <section className={styles.subMenu}>
        <a className={styles.subMenuButton} href=''>내견적확인</a>
        <button className={styles.subMenuButton}>즐겨찾기추가</button>
      </section>
      <nav className={styles.navbar}>
        <a href=''>
          <img src='http://www.ekhanabus.com/image/ekhana_logo_New3.png' alt='EK tour logo' className={styles.logo} />
        </a>
        <section className={styles.container}>
          <ul className={styles.navbarMenu}>
            <li><a className={styles.menu} href=''>회사소개</a></li>
            <li><a className={styles.menu} href=''>버스안내</a></li>
            <li><a className={styles.menu} href=''>견적요청</a></li>
            <li><a className={styles.menu} href=''>고객센터</a></li>
          </ul>
        </section>
      </nav>
    </header>
  );
};

export default Header;