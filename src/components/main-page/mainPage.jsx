import React from 'react';
import styles from './mainPage.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';

const MainPage = (props) => {
  return (
    <section className={styles.mainPage}>
      <Header />
      <main>
        <h1>details</h1>
      </main>
      <Footer />
    </section>
  );
};

export default MainPage;