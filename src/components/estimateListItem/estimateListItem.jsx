import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyEstimate from '../myEstimate/myEstimateV1';
import styles from './estimateListItem.module.css';

const EstimateListItem = (props, { ektour }) => {

  const navigate = useNavigate();
  const { page } = useParams();

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
    // 내 견적 목록에서 요청 (바로 견적 상세보기로)
    if (props.myEstimate) navigate(`/estimate/my/list/${page}/${props.id}`);

    // 모든 견적 목록에서 요청 (요청 폼 거쳐서 상세보기로)
    else setOpen(true);
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
      <MyEstimate
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