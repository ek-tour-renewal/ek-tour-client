import { Fab, Box, Tooltip, Zoom, Card, CardContent, Typography, Grow, CardHeader, IconButton, CardActions, Button, Divider } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton = (props) => {
  const navigate = useNavigate();
  const [openCenter, setOpenCenter] = useState(false);

  const handleClickServiceCenterDetail = () => { setOpenCenter(!openCenter) };

  const goServiceCenter = () => {
    navigate('/service-center');
    handleClickServiceCenterDetail();
  }
  

  return (
    <Box>
      <Tooltip
        arrow
        title='상담문의 01063876086'
        placement='left'
        TransitionComponent={Zoom}>
        <Fab
          onClick={handleClickServiceCenterDetail}
          variant='extended'
          sx={{
            position: 'fixed',
            right: '2%',
            bottom: '5%',
            backgroundColor: '#EC9F46',
            color: '#FCFCFC',
            fontSize: '1.3em',
            p: '1em',
            transition: '1s',
            '&:hover': {
              backgroundColor: '#FFFACB',
              color: '#5A4231',
              transform: 'scale(1.02)'
            }
          }}>
          상담문의
          <ChatIcon sx={{ marginLeft: '5px', fontSize: '1.3em' }} />
        </Fab>
      </Tooltip>

      <Grow in={openCenter}>
        <Card
          sx={{
            maxWidth: 340,
            position: 'fixed',
            right: '2%',
            bottom: '12%',
            backgroundColor: '#FFCC49',
            borderRadius: '20px'
          }}>

          <CardHeader
            title='이케이하나관광'
            action={
              <IconButton
                aria-label={openCenter}
                onClick={handleClickServiceCenterDetail}>
                <CloseIcon sx={{ color: '#5A4231' }} />
              </IconButton>
            }
            sx={{ paddingBottom: 0, color: '#5A4231' }}
          />

          <CardContent sx={{ textAlign: 'start' }}>
            <Box
              sx={{
                borderRadius: '15px',
                backgroundColor: '#FFFACB',
                p: '15px'
              }}>
              <Typography
                variant='h6'
                sx={{
                  pb: '8px',
                  fontWeight: 'bold',
                  color: '#42772F'
                }}>
                고객센터
              </Typography>

              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#7A5E29',
                  mb: '5px'
                }}>
                {props.companyData.tel}
              </Typography>

              <Typography sx={{ fontSize: '16px', mb: '5px' }}>
                상담 가능 시간 : 09시~18시
              </Typography>

              <Typography
                sx={{
                  fontSize: '14px',
                  width: '100%'
                }}>
                업무시간 이외에도 전화 주시면 친절히 상담해 드립니다.
              </Typography>

              <Divider variant="middle" sx={{ m: '15px 0' }} />

              <Typography
                variant='h6'
                sx={{
                  pb: '8px',
                  fontWeight: 'bold',
                  color: '#42772F'
                }}>
                상담문의
              </Typography>

              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#7A5E29',
                  mb: '5px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <PhoneRoundedIcon sx={{ mr: '5px' }} />
                {props.companyData.phone}
              </Typography>

              <Typography
                sx={{
                  fontSize: '16px',
                  mb: '5px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <img src='/image/kakaotalk.png' alt='kakaotalk logo' height='25px' />
                &nbsp; 카톡 상담 : {props.companyData.kakaoTalkId}
              </Typography>

              <Typography
                sx={{
                  fontSize: '16px',
                  mb: '5px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <EmailRoundedIcon sx={{ color: '#5A4231', mr: '5px' }} />
                이메일 : {props.companyData.email}
              </Typography>

              <Divider variant="middle" sx={{ m: '15px 0' }} />

              <Typography
                variant='h6'
                sx={{
                  pb: '8px',
                  fontWeight: 'bold',
                  color: '#42772F'
                }}>
                무통장 입금 안내
              </Typography>

              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#7A5E29',
                  mb: '5px'
                }}>
                {props.companyData.accountNum}
              </Typography>

              <Typography
                sx={{
                  color: '#CA904C',
                  fontWeight: 'bold',
                  mb: '5px'
                }}>
                {props.companyData.accountBank}
              </Typography>

              <Typography sx={{ fontSize: '15px' }}>
                예금주 {props.companyData.accountHolder}
              </Typography>

            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: 'end', pt: 0 }}>
            <Button
              onClick={goServiceCenter}
              sx={{
                p: 0,
                color: '#42772F',
                transition: '0.5s',
                fontWeight: 'bold',
                '&:hover': {
                  color: '#FFFACB',
                  backgroundColor: 'unset',
                  transform: 'scale(1.02)'
                }
              }}>
              고객센터 바로가기
              <DirectionsRunIcon />
            </Button>
          </CardActions>

        </Card>
      </Grow>
    </Box>
  )
};

export default FloatingActionButton;