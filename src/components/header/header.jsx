import React, { memo } from 'react';
import { useRef } from 'react';
import styles from './header.module.css';

const Header = memo((props) => {
  const menuRef = useRef();

  const onHover = () => {
    menuRef.className.ClassList('hover');
    console.log("hover")
  };

  return (
    <header className={styles.header}>
      <section className={styles.headerNav}>
        <a className={styles.headerNavButton} href='/search'>내견적확인</a>
      </section>
      <nav className={styles.navbar}>
        <a href='/'>
          <img src='/image/logo.png' alt='EK tour logo' className={styles.logo} />
        </a>
        <section className={styles.container}>
          <ul className={styles.navbarMenu}>
            <li >
              <a className={styles.menu} href='/introduce' onMouseOver={onHover}>회사소개</a>
              <ul>
                <li><a className={styles.subMenu} href='/introduce' ref={menuRef}>CEO 인삿말</a></li>
              </ul>
            </li>
            <li >
              <a className={styles.menu} href='/notice'>버스안내</a>
              <ul className={styles.subMenuContainer}>
                <li><a className={styles.subMenu} href='/notice'>버스안내</a></li>
                <li><a className={styles.subMenu} href='/smallbus'>25인승 소형</a></li>
                <li><a className={styles.subMenu} href='/limousine'>28인승 리무진</a></li>
                <li><a className={styles.subMenu} href='/bigbus'>45인승 대형</a></li>
              </ul>
            </li>
            <li>
              <a className={styles.menu} href='/request'>견적요청</a>
              <ul className={styles.subMenuContainer}>
                <li><a className={styles.subMenu} href='/list'>견적요청목록</a></li>
                <li><a className={styles.subMenu} href='/request'>견적요청하기</a></li>
                <li><a className={styles.subMenu} href='/search'>나의견적확인</a></li>
              </ul>
            </li>
            <li>
              <a className={styles.menu} href='/service'>고객센터</a>
              <ul className={styles.subMenuContainer}>
                <li><a className={styles.subMenu} href='/service'>고객센터</a></li>
              </ul>
            </li>
          </ul>
        </section>

        <button className={styles.toggle}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>
    </header>
  )
});

export default Header;
