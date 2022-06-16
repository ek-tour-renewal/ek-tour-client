import React from 'react';
import styles from './busNotice.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';

const BusNotice = (props) => {
  return (
    <main className={styles.busNotice}>
      <Header />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader />
          <section>
            <h1>버스안내</h1>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default BusNotice;