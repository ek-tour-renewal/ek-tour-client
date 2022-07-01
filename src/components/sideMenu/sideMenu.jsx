import { Button } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sideMenu.module.css';

const SideMenu = (props) => {
  // const navigate = useNavigate();

  // const onNavigate = (path) => {
  //   navigate(path);
  // };

  return (
    <div className={styles.sideMenu}>
      <Button
        variant='contained'
        className={styles.button}
        >
        <ApartmentIcon fontSize='large' />
        회사소개
      </Button>
      <Button
        variant='contained'
        className={styles.button}
        >
        <DirectionsBusIcon fontSize='large' />
        버스안내
      </Button>
      <Button
        variant='contained'
        className={styles.button}
      >
        <ReceiptLongIcon fontSize='large' />
        견적요청
      </Button>
    </div>
  )
};

export default SideMenu;