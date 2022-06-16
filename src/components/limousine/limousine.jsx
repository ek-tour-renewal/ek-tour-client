import React from 'react';
import styles from './limousine.module.css';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import Footer from '../footer/footer';

const Limousine = (props) => {
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
            <h1>28인승 리무진</h1>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default Limousine;