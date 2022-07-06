import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoRoundedIcon from '@mui/icons-material/LooksTwoRounded';
import Looks3RoundedIcon from '@mui/icons-material/Looks3Rounded';
import Looks4RoundedIcon from '@mui/icons-material/Looks4Rounded';
import Looks5RoundedIcon from '@mui/icons-material/Looks5Rounded';
import Looks6RoundedIcon from '@mui/icons-material/Looks6Rounded';
import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';


const UseNotice = (props) => {
  return (
    <Box
      sx={{
        width: '90%',
        m: 'auto',
        p: '1em 0',
        borderRadius: '20px',
        textAlign: 'center'
      }}>
      <Typography
        sx={{
          width: '90%',
          p: '10px',
          m: 'auto',
          borderRadius: '10px',
          backgroundColor: '#EC9F46',
          color: '#FCFCFC'
        }}>
        이용 안내
      </Typography>

      <Container
      sx={{m: '16px auto', width: 'max-content'}}>
      <Stack direction='row' sx={{mb: '16px'}}>
      <LooksOneRoundedIcon sx={{ color: '#D3D3D3', mr: '10px' }} />
      <Typography>견적요청 / 전화상담</Typography>
      </Stack>

      <Stack direction='row' sx={{mb: '16px'}}>
        <LooksTwoRoundedIcon sx={{ color: '#D3D3D3', mr: '10px' }} />
      <Typography>상담 후 견적서 제공</Typography>
      </Stack>
      

      <Stack direction='row' sx={{mb: '16px'}}>
      <Looks3RoundedIcon sx={{ color: '#D3D3D3', mr: '10px' }} />
      <Typography>계약금 입금 / 계약서 작성</Typography>
      </Stack>
      

      <Stack direction='row' sx={{mb: '16px'}}>
      <Looks4RoundedIcon sx={{ color: '#D3D3D3', mr: '10px' }} />
      <Typography>배차</Typography>
      </Stack>
      

      <Stack direction='row' sx={{mb: '16px'}}>
      <Looks5RoundedIcon sx={{ color: '#D3D3D3', mr: '10px' }} />
      <Typography>배차 후 기사님 확인전화</Typography>
      </Stack>
      

      <Stack direction='row'>
      <Looks6RoundedIcon sx={{ color: '#D3D3D3', mr: '10px' }} />
      <Typography>당일출발</Typography>
      </Stack>

      </Container>
    </Box>
  )
};

export default UseNotice;