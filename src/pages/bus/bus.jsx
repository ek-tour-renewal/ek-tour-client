import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import BigBus from '../../components/bus/bigBus';
import Limousine from '../../components/bus/limousine';
import SmallBus from '../../components/bus/smallBus';
import BusNotice from '../../components/bus/busNotice';

const Bus = () => {
  const [busState, setBusState] = useState('notice');

  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `이케이하나관광-버스안내`;
  }, []);

  function BusButton(props) {
    return (
      <Button
      onClick={props.buttonClick}
      variant='contained'
      sx={{
        width: '6.8em', 
        height: '6em', 
        color: '#5A4231', 
        borderRadius: '50%', 
        m: '40px 10px', 
        backgroundColor: '#D3D3D3',
        transition: '0.5s',
        '&:hover': {
          backgroundColor: '#FFFACB',
          transform: 'scale(1.02)'
        }
      }}>
        {props.buttonText}
      </Button>
    )
  }

  const handleClickNotice = () => {setBusState('notice')};
  const handleClickSmallBus = () => {setBusState('smallBus')};
  const handleClickLimousine = () => {setBusState('limousine')};
  const handleClickBigBus = () => {setBusState('bigBus')};

  return (
    <>
      <Box>
        <BusButton 
        buttonText='버스 안내'
        buttonClick={handleClickNotice} />
        <BusButton 
        buttonText='25인승 소형'
        buttonClick={handleClickSmallBus} />
        <BusButton 
        buttonText='28인승 리무진'
        buttonClick={handleClickLimousine} />
        <BusButton 
        buttonText='45인승 대형'
        buttonClick={handleClickBigBus} />
      </Box>

      {busState === 'notice' && <BusNotice />}

      {busState === 'smallBus' && <SmallBus />}

      {busState === 'limousine' && <Limousine />}

      {busState === 'bigBus' && <BigBus />}
    </>
  )
};

export default Bus;