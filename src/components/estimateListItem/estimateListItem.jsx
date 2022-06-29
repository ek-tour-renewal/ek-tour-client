import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './estimateListItem.module.css';

const EstimateListItem = ({ data }) => {
 const { id, name, travelType, departPlace, arrivalPlace, vehicleType, createdDate } = data;
 const navigation = useNavigate();

 // 이름 마스킹
  const masking = name => {
    switch (name.length) {
      case 2 : return name.replace(name.substring(1,),"*");
      case 3 : return name.replace(name.substring(1,),"**");
      default : return name.replace(name.substring(1,),"***");
    }
  };

  //페이지이동
  const onNavigate = (path) => {
    navigation(path);
  };

  return (
    <li className={styles.estimateListItem} onClick={() => onNavigate('/my')}>
      <span className={styles.id}>{id - 1}</span>
      <span className={styles.name}>{masking(name)}</span>
      <span className={styles.travelType}>{travelType}</span>
      <span className={styles.departPlace}>{departPlace}</span>
      <span className={styles.arrivalPlace}>{arrivalPlace}</span>
      <span className={styles.vehicleType}>{vehicleType}</span>
      <span className={styles.createdDate}>{createdDate.substring(0,10)}</span>
    </li>
  )
};

export default EstimateListItem;