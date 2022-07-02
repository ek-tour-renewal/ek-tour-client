import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyEstimateV1 from '../myEstimate/myEstimateV1';
import styles from './estimateListItem.module.css';

const EstimateListItem = (props, { ektour }) => {

  const navigate = useNavigate();
  const estimateId = useParams();

  const [open, setOpen] = useState(false);

  // 이름 마스킹
  const masking = name => {
    switch (name.length) {
      case 2 : return name.replace(name.substring(1,),"*");
      case 3 : return name.replace(name.substring(1,),"**");
      default : return name.replace(name.substring(1,),"***");
    }
  };

  const handleClickListItem = () => {
    setOpen(true);
  }

  const handleCloseMyEstimate = () => {
    setOpen(false);
  }

  return (
    <>
      <li className={styles.estimateListItem} onClick={handleClickListItem}>
        <span className={styles.id}>{props.id}</span>
        <span className={styles.name}>{masking(props.name)}</span>
        <span className={styles.travelType}>{props.travelType}</span>
        <span className={styles.departPlace}>{props.departPlace}</span>
        <span className={styles.arrivalPlace}>{props.arrivalPlace}</span>
        <span className={styles.vehicleType}>{props.vehicleType}</span>
        <span className={styles.createdDate}>{props.createdDate.substring(0,10)}</span>
      </li>
      <MyEstimateV1
        open={open}
        onClose={handleCloseMyEstimate}
        estimateId={props.id}
        userName={masking(props.name)}
        ektour={ektour}
      />
    </>
  );
};

export default EstimateListItem;