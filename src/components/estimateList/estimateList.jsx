import React from 'react';
import styles from './estimateList.module.css';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import Footer from '../footer/footer';


const EstimateList = (props) => {
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
            <h1>견적요청목록</h1>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default EstimateList;