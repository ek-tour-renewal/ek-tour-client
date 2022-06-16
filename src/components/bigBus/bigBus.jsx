import React from 'react';
import styles from './bigBus.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';

const BigBus = (props) => {
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
            <h1>45인승 대형</h1>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default BigBus;