import React from 'react';
import styles from './subHeader.module.css';

const SubHeader = ({ menu }) => {
  return (
    <section className={styles.subHeader}>
      <h1 className={styles.title}>{menu}</h1>
    </section>
  )
};

export default SubHeader;