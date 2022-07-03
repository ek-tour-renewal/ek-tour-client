import React from 'react';
import styles from './main.module.css';
import Estimate from '../estimate/estimate';

const Main = (props) => {
  return (
    <>
      <section className={styles.main}>
        <Estimate/>
      </section>
    </>
  )
};

export default Main;