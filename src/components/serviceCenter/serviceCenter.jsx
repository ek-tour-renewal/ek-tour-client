import React from 'react';
import styles from './serviceCenter.module.css';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import Footer from '../footer/footer';

const ServiceCenter = (props) => {
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
            <h1>고객센터</h1>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default ServiceCenter;