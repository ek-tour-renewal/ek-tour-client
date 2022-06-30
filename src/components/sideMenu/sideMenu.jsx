import { Grid, Button } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sideMenu.module.css';

const SideMenu = (props) => {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.sideMenu}>
      <Button
        variant='contained'
        sx={{
          height: '6em', color: '#5A4231', borderRadius: '20px', marginBottom: '10px', backgroundColor: 'rgba(255, 250, 203, 0.7)',
          display: 'flex', flexDirection: 'column',
          '&:hover': {
            backgroundColor: '#FCFCFC',
            color: 'EC9F46',
          },
        }}
        onClick={() => onNavigate('/introduce')}>
        <ApartmentIcon fontSize='large' />
        회사소개
      </Button>
      <Button
        variant='contained'
        sx={{
          height: '6em', color: '#5A4231', borderRadius: '20px', marginBottom: '10px', backgroundColor: 'rgba(255, 250, 203, 0.7)',
          display: 'flex', flexDirection: 'column',
          '&:hover': {
            backgroundColor: '#FCFCFC',
            color: 'EC9F46',
          },
        }}
        onClick={() => onNavigate('/bus')}>
        <DirectionsBusIcon fontSize='large' />
        버스안내
      </Button>
      <Button
        variant='contained'
        sx={{
          height: '6em', color: '#5A4231', borderRadius: '20px', backgroundColor: 'rgba(255, 250, 203, 0.7)',
          display: 'flex', flexDirection: 'column',
          '&:hover': {
            backgroundColor: '#FCFCFC',
            color: 'EC9F46',
          },
        }}
        onClick={() => onNavigate('/request')}>
        <ReceiptLongIcon fontSize='large' />
        견적요청
      </Button>
    </div>
  )
};

export default SideMenu;