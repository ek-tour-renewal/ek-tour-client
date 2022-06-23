import React, { memo } from 'react';
import styles from './button.module.css';

const Button = memo((props) => {
  return (
    <section>
      <a href='tel:010-6387-6086'>
        <ul className={styles.contactButton}>
          <img className={styles.contactImage} src="/image/phoneicon.png" alt="phone icon" />
          <ul className={styles.contactInfo}>
            <li className={styles.contactTitle}>Service Center</li>
            <li className={styles.contactNumber}>02.3432.6545</li>
            <li className={styles.contactPhoneNumber}>010.6387.6086</li>
          </ul>
        </ul>
      </a>
      <a href='/request'>
      <ul className={styles.estimateButton}>
          <img className={styles.estimateImage} src="/image/estimateicon.png" alt="phone icon" />
          <ul className={styles.estimateInfo}>
            <li className={styles.estimateTitle}>E-ESTIMATION</li>
            <li className={styles.estimateRequest}>실시간 견적요청하기</li>
            <li className={styles.estimateGo}>✨ Go</li>
          </ul>

        </ul>
        </a>
    </section>
  )
});

export default Button;