import React from 'react';
import { useState } from 'react';
import styles from './header.module.css';

const Header = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
    console.log("over");
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    console.log("out");
  };

  return (
    <header className={styles.header}>
      <section className={styles.headerNav}>
        <a className={styles.headerNavButton} href='#'>내견적확인</a>
      </section>
      <nav className={styles.navbar}>
        <a href='#'>
          <img src='/image/logo.png' alt='EK tour logo' className={styles.logo} />
        </a>
        <section className={styles.container} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <ul className={styles.navbarMenu}>
            <li ><a className={styles.menu} href='#'>회사소개</a></li>
            <li ><a className={styles.menu} href='#'>버스안내</a></li>
            <li ><a className={styles.menu} href='#'>견적요청</a></li>
            <li ><a className={styles.menu} href='#'>고객센터</a></li>
          </ul>
          {isHovering && (
            <ul className={styles.subNavbar}>
              <div className={styles.subContainer} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <ul>
                  <li><a className={styles.subMenu} href='#'>CEO 인삿말</a></li>
                </ul>
                <ul>
                  <li><a className={styles.subMenu} href='#'>버스안내</a></li>
                  <li><a className={styles.subMenu} href='#'>25인승 소형</a></li>
                  <li><a className={styles.subMenu} href='#'>28인승 리무진</a></li>
                  <li><a className={styles.subMenu} href='#'>45인승 대형</a></li>
                </ul>
                <ul>
                  <li><a className={styles.subMenu} href='#'>견적요청목록</a></li>
                  <li><a className={styles.subMenu} href='#'>견적요청하기</a></li>
                  <li><a className={styles.subMenu} href='#'>나의견적확인</a></li>
                </ul>
                <ul>
                  <li><a className={styles.subMenu} href='#'>고객센터</a></li>
                </ul>
              </div>
            </ul>
          )}
        </section>

        <button className={styles.toggle}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;