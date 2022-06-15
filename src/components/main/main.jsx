import React from 'react';
import styles from './main.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Estimate from '../estimate/estimate';

const Main = (props) => {
  return (
    <section className={styles.main}>
      <Header />
      <main className={styles.body}>
        <Estimate />
        <section className={styles.contact}>

        </section>
      </main>
      <Footer />
    </section>
  );
};

export default Main;