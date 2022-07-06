import { Box, Typography } from '@mui/material';
import React from 'react';

const Banner = (props) => (
  <Box>
  <img src='/image/mobileMain.jpg' width='100%' alt="main image" />
  <Typography 
  sx={{
    width: '100%',
    position: 'absolute',
    top: '5.5em',
    p: '5px',
    fontSize: 'small',
    fontWeight: 'bold',
    color: '#5A4231',
    backgroundColor: 'rgba(255, 250, 203, 0.7)',
    borderRadius: '10px',
    boxShadow: '0 0 5px 5px rgba(255, 250, 203, 0.7)',
    textAlign: 'center'
    }}>
    모든 지역에서 최상의 서비스로 안전하게 모십니다.
  </Typography>
  </Box>
);

export default Banner;