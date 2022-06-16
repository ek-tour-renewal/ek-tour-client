import React from 'react';
import styles from './myEstimate.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';

const MyEstimate = (props) => {
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
            <h1>나의 견적 확인</h1>
          </section>
        </section>
      </section>
      <Footer />
  </main>
)};

export default MyEstimate;