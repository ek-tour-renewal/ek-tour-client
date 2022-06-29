import React from 'react';
import styles from './estimateListItem.module.css';

const EstimateListItem = (props) => {
  // 이름 마스킹
  const masking = name => {
    switch (name.length) {
      case 2 : return name.replace(name.substring(1,),"*");
      case 3 : return name.replace(name.substring(1,),"**");
      default : return name.replace(name.substring(1,),"***");
    }
  };

  const handleClickListItem = (id) => {
    // TODO 해당 견적 클릭 시 실행 코드
  }

  return (
    <li className={styles.estimateListItem} onClick={handleClickListItem(props.id)}>
      <span className={styles.id}>{props.id}</span>
      <span className={styles.name}>{masking(props.name)}</span>
      <span className={styles.travelType}>{props.travelType}</span>
      <span className={styles.departPlace}>{props.departPlace}</span>
      <span className={styles.arrivalPlace}>{props.arrivalPlace}</span>
      <span className={styles.vehicleType}>{props.vehicleType}</span>
      <span className={styles.createdDate}>{props.createdDate.substring(0,10)}</span>
    </li>
  );
};

export default EstimateListItem;