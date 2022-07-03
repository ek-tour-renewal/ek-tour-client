import React from 'react';
import styles from './main.module.css';
import Estimate from '../estimate/estimate';

const Main = (props) => {
  return (
    <main>
      <section className={styles.main}>
        <Estimate/>
      </section>
    </main>
  )
};

export default Main;