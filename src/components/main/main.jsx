import React, { useEffect } from 'react';
import styles from './main.module.css';
import Estimate from '../estimate/estimate';

const Main = (props) => {
  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `이케이하나관광`;
  }, []);
  return (
    <section className={styles.main}>
      <Estimate />
    </section>
  )
};

export default Main;