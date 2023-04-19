import React, { useState } from 'react';
import styles from './estimateListItem.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {Box} from "@mui/material";
import MyEstimateForm from './myEstimateForm';

const EstimateListItem = (props) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const { state } = useLocation();

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
    if (props.myEstimate) navigate(`/estimate/my/list/${page}/${props.id}`, { state : { form: state.form } });
    else setOpen(true);
  }

  const handleCloseMyEstimate = () => {
    setOpen(false);
  }

  return (
    <>
      <li className={styles.estimateListItem} onClick={handleClickListItem}>
        <Box className={styles.id}>{props.id}</Box>
        <Box className={styles.name}>{masking(props.name)}</Box>
        <Box className={styles.travelType}>{props.travelType}</Box>
        <Box className={styles.departPlace}>{props.departPlace}</Box>
        <Box className={styles.arrivalPlace}>{props.arrivalPlace}</Box>
        <Box className={styles.vehicleType}>{props.vehicleType}</Box>
        <Box className={styles.createdDate}>{props.createdDate.substring(0,10)}</Box>
      </li>

      <MyEstimateForm
        open={open}
        onClose={handleCloseMyEstimate}
        estimateId={props.id}
        userName={masking(props.name)}
      />
    </>
  );
};

export default EstimateListItem;