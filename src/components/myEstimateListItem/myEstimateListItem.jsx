import React from 'react';
import styles from './myEstimateListItem.module.css';

const MyEstimateCheckList = ({ data }) => {
  const { number, name, travel, departPlace, arrivalPlace, vehicle, requestDate } = data;

  //어떻게하지
  const masking = name => {
    const maskingName = name.substring(0,1) + name.substring(1,3).replace("*");
    return maskingName
  }

  return (
    <a className={styles.estimateListItem} href='#'>
      <span className={styles.number}>{number}</span>
      <span className={styles.name}>{masking(name)}</span>
      <span className={styles.travel}>{travel}</span>
      <span className={styles.departPlace}>{departPlace}</span>
      <span className={styles.arrivalPlace}>{arrivalPlace}</span>
      <span className={styles.vehicle}>{vehicle}</span>
      <span className={styles.requestDate}>{requestDate}</span>
    </a>
  )
};

export default MyEstimateCheckList;