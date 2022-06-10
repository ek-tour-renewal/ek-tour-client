import React from 'react';
import styles from './detail.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';

const Detail = (props) => {
  return (
    <section className={styles.detail}>
      <Header />
      <main>
        <h1>details</h1>
      </main>
      <Footer />
    </section>
  );
};

export default Detail;