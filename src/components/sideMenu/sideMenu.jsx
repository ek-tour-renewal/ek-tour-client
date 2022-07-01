import { Button } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sideMenu.module.css';

const SideMenu = (props) => {
  const navigate = useNavigate();

  function SideButton(props) {
    return (
      <Button
        onClick={props.clickPath}
        variant='contained'
        sx={{
          height: '6em', 
          color: '#5A4231', 
          borderRadius: '20px', 
          marginBottom: '10px', 
          backgroundColor: 'rgba(255, 250, 203, 0.7)',
          display: 'flex', 
          flexDirection: 'column', 
          transition: '1s',
          '&:hover': {
            backgroundColor: '#FCFCFC',
            color: 'EC9F46',
            transform: 'scale(1.04)'
          },
        }}>
          {props.buttonIcon}
          {props.buttonText}
      </Button>
    )
  }

  const handleClickCompany = () => { navigate('/introduce'); }
  const handleClickBusInfo = () => { navigate('/bus'); }
  const handleClickRequestEstimateList = () => { navigate('/estimate/list/1'); }

  return (
    <div className={styles.sideMenu}>
      <SideButton
        clickPath={handleClickCompany}
        buttonIcon={<ApartmentIcon fontSize='large' />}
        buttonText='회사소개'
      />
      <SideButton
        clickPath={handleClickBusInfo}
        buttonIcon={<DirectionsBusIcon fontSize='large' />}
        buttonText='버스안내'
      />
      <SideButton
        clickPath={handleClickRequestEstimateList}
        buttonIcon={<FactCheckIcon fontSize='large' />}
        buttonText='견적목록'
      />
    </div>
  )
};

export default SideMenu;