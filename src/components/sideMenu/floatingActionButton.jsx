import { Fab, Box, Tooltip, Zoom, Card, CardContent, Typography, Grow, CardHeader, IconButton, CardActions, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FloatingActionButton = (props) => {
  const navigate = useNavigate();
  const [openCenter, setOpenCenter] = useState(false);

  const handleClickServiceCenterDetail = () => {
    setOpenCenter(!openCenter);
  };
  const handleClickServiceCenter = () => {
    navigate('/service-center');
    handleClickServiceCenterDetail();
  };

  return (
    <Box>
      <Tooltip
        arrow
        title='상담문의 01063876086'
        placement='left'
        TransitionComponent={Zoom}>
        <Fab
          onClick={handleClickServiceCenter}
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
          고객센터N
          <ChatIcon sx={{ marginLeft: '5px', fontSize: '1.3em' }} />
        </Fab>
      </Tooltip>
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
            bottom: '12%',
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
          고객센터D
          <ChatIcon sx={{ marginLeft: '5px', fontSize: '1.3em' }} />
        </Fab>
      </Tooltip>
      <Grow
        in={openCenter}>
        <Card
          sx={{
            maxWidth: 345,
            position: 'fixed',
            right: '2%',
            bottom: '15%',
            backgroundColor: '#FFFACB',
            borderRadius: '15px'
          }}>
          <CardHeader
            title='고객센터'
            action={
              <IconButton
                aria-label={openCenter}
                onClick={handleClickServiceCenterDetail}>
                <CloseIcon />
              </IconButton>
            } />
          <CardContent>
            <Typography variant='h5'>
              고객센터
            </Typography>
            <Typography>
              02.3432.6545
            </Typography>
            <Typography>
              상담 가능 시간 09시~18시
            </Typography>
            <Typography>
              업무시간 이외에도 전화 주시면 친절히 상담해 드립니다.
            </Typography>
            <Typography variant='h5'>
              무통장 입금 안내
            </Typography>
            <Typography>
              KB 국민은행
            </Typography>
            <Typography>
              810137-04-006627
            </Typography>
            <Typography>
              예금주 이케이투어
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleClickServiceCenter}>
            고객센터 바로가기
            <ChatIcon />
            </Button>
          </CardActions>
        </Card>
      </Grow>
    </Box>
  )
};

export default FloatingActionButton;