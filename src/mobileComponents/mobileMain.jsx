import { Box } from '@mui/material';
import React from 'react';
import MobileBus from './mobileBus';
import MobileEstimate from './mobileEstimate';

const MobileMain = (props) => {
  return (
    <Box>
      <MobileEstimate />
      <MobileBus />
    </Box>
  )
};

export default MobileMain;