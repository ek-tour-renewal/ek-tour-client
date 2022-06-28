import React, { memo, useState } from 'react';
import styles from './header.module.css';

const Header = memo(({ changePage }) => {
  const [active, setActive] = useState(false);

  const onOpenMenu = () => {
    setActive(!active);
  };

  return (
    <header className={styles.header}>
      <section className={styles.headerMyEstimate}>
        <a className={styles.headerMyEstimateButton} href='/my'>내견적확인</a>
      </section>
      <nav className={styles.navbar}>
        <a href='/'>
          <img className={styles.logo} src='http://52.79.242.242:8080/img/logo.png' alt='EK tour logo' />
        </a>
        <div className={styles.container}>
          <ul className={!active ? styles.navbarMenu : styles.hiddenNavbarMenu}>
            <li className={styles.introduce}>
              <button className={styles.menuTitle} onClick={() => changePage('introduce')}>회사소개</button>
            </li>
            <li className={styles.busNotice} >
              <button className={styles.menuTitle} onClick={() => changePage('notice')}>버스안내</button>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => changePage('notice')}>버스안내</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => changePage('smallBus')}>25인승 소형</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => changePage('limousine')}>28인승 리무진</button></li>
                <li className={styles.subMenuContainer}><button className={styles.subMenu} onClick={() => changePage('bigBus')}>45인승 대형</button></li>
              </ul>
            </li>
            <li className={styles.request}>
              <a className={styles.menuTitle} href='/list'>견적요청</a>
              <ul className={styles.dropdownMenu}>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/list'>견적요청목록</a></li>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/request'>견적요청하기</a></li>
                <li className={styles.subMenuContainer}><a className={styles.subMenu} href='/my'>나의견적확인</a></li>
              </ul>
            </li>
            <li className={styles.service}>
              <button className={styles.menuTitle} onClick={() => changePage('serviceCenter')}>고객센터</button>
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
