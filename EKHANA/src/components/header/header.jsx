import React from 'react';
import styles from './header.module.css';

const Header = props => {
  return (
    <header>
      <section className={styles.subMenu}>
        <button className={styles.subMenuButton}>내견적확인</button>
        <button className={styles.subMenuButton}>즐겨찾기추가</button>
      </section>
      <section className={styles.header}>
        <button className={styles.logoButton}>
          <img src='http://www.ekhanabus.com/image/ekhana_logo_New3.png' alt='EK tour logo' className={styles.logo} />
        </button>
        <nav className={styles.navbar}>
          <div className={styles.container}>
            <button className={styles.menu}>회사소개</button>
            <button className={styles.menu}>버스안내</button>
            <button className={styles.menu}>견적요청</button>
            <button className={styles.menu}>고객센터</button>
          </div>
        </nav>
      </section>
    </header>
  );
};

export default Header;