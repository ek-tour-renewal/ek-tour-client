import React from 'react';
import styles from './smallBus.module.css';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import Footer from '../footer/footer';

const SmallBus = (props) => {
  return (
    <main>
      <Header />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader />
          <section>
            <h1>25인승 소형</h1>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default SmallBus;