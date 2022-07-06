import { Box } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileBus from './mobileBus';
import MobileEstimate from './mobileEstimate';
import ScrollUpButton from '../scrollUpButton';
import Banner from './banner';
import UseNotice from './useNotice';

const MobileMain = (props) => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/mobile');
  }, []);

  return (
    <Box>
      <Banner />
      <MobileEstimate />
      <MobileBus />
      <UseNotice />

      {/* 스크롤 맨 위로 보내는 버튼 */}
      <ScrollUpButton />
    </Box>
  )
};

export default MobileMain;