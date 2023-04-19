import React, { useEffect } from 'react';
import styles from './main.module.css';
import Estimate from '../components/estimate/request/estimate';

const Main = () => {
  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `이케이하나관광`;
  }, []);

  return (
    <main className={styles.main}>
      <Estimate />
    </main>
  )
};

export default Main;