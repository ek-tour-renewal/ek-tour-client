import React, { memo } from 'react';
import styles from './subHeader.module.css';

const SubHeader = memo(({ menu }) => {
  return (
    <section className={styles.subHeader}>
      <h1 className={styles.title}>{menu}</h1>
    </section>
  )
});

export default SubHeader;