import React from 'react';
import styles from './mainPage.module.css';
import Detail from '../detail/detail';
import Footer from '../footer/footer';
import Header from '../header/header';

const MainPage = (props) => {
  return (
    <section className={styles.mainPage}>
      <Header />
      <Detail />
      <Footer />
    </section>
  );
};

export default MainPage;