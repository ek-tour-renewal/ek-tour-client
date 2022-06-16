import React from 'react';
import styles from './subHeader.module.css';

const SubHeader = (props) => {
  return (
    <section className={styles.subHeader}>
      <h1 className={styles.title}>CEO 인사말</h1>
    </section>
  )
};

export default SubHeader;