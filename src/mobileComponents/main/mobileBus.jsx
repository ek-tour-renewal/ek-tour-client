import { Box, Typography, Collapse, Button, Stack } from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { TransitionGroup } from 'react-transition-group';
import React, { useState } from 'react';

const MobileBus = (props) => {
  const smallBusImages = [
    './image/smallBusExterior.jpg',
    './image/smallBus/interior1.jpg',
    './image/smallBus/interior2.jpg',
    './image/smallBus/interior3.jpg',
    './image/smallBus/interior4.jpg',
    './image/smallBus/interior5.jpg',
    './image/smallBus/interior6.jpg'
  ];


  const limousineImages = [
    './image/limousineExterior.jpg',
    './image/limousine/interior1.jpg',
    './image/limousine/interior2.jpg',
    './image/limousine/interior3.jpg',
    './image/limousine/interior4.jpg',
    './image/limousine/interior5.jpg',
    './image/limousine/interior6.jpg',
    './image/limousine/interior7.jpg',
    './image/limousine/interior8.jpg',
    './image/limousine/interior9.jpg',
    './image/limousine/interior10.jpg',
    './image/limousine/interior11.jpg'
  ];

  const bigBusImages = [
    './image/bigBusExterior.jpg',
    './image/bigBus/interior1.jpg',
    './image/bigBus/interior2.jpg',
    './image/bigBus/interior3.jpg',
    './image/bigBus/interior4.jpg',
    './image/bigBus/interior5.jpg',
    './image/bigBus/interior6.jpg',
    './image/bigBus/interior7.jpg',
    './image/bigBus/interior8.jpg',
    './image/bigBus/interior9.jpg',
    './image/bigBus/interior10.jpg',
    './image/bigBus/interior11.jpg',
    './image/bigBus/interior12.jpg',
    './image/bigBus/interior13.jpg'
  ];

  const [smallBusLists, setSmallBusLists] = useState([smallBusImages[0]]);
  const [limousineLists, setLimousineLists] = useState([limousineImages[0]]);
  const [bigBusLists, setBigBusLists] = useState([bigBusImages[0]]);

  function HeaderTypography(props) {
    return (
      <Typography
        sx={{
          color: '#5A4231',
          fontSize: '18px',
          fontWeight: 'bold',
          m: '15px 0'
        }}>
        {props.busType}
      </Typography>
    )
  };

  function ImgSlider(props) {
    const handlePrevImg = (item) => {
      if (props.imgLists.length > 1) { props.setImgLists([...props.imgLists.filter((i) => i !== item)]) }
    };

    const handleNextImg = () => {
      const nextHiddenItem = props.imgPaths.find((item) => !props.imgLists.includes(item));
      if (nextHiddenItem) { props.setImgLists([nextHiddenItem, ...props.imgLists]) }
    };

    return (
      <Box
        sx={{
          width: 'max-content',
          m: '0 auto',
          pb: '0.5em',
          display: 'flex',
          alignItems: 'center',
          border: '3px solid #D3D3D3',
          borderRadius: '20px'
        }}>
        <Button
          onClick={() => handlePrevImg(props.imgLists[0])}
          disabled={props.imgLists.length < 1}
          sx={{ 
            p: 0, 
            minWidth: '20px', 
            color: '#EC9F46', 
            backgroundColor: 'rgba(137, 146, 135, 0.2)', 
            borderRadius: '50%',
            m: '0.5em'
          }}
        >
          <NavigateBeforeRoundedIcon />
        </Button>
        <Stack
          sx={{
            width: '210px',
            height: '150px',
            overflow: 'hidden',
            m: '0 auto'
          }}>
          <TransitionGroup style={{ margin: 'auto' }}>
            {props.imgLists.map((img) => (
              <Collapse sx={{ m: '8px', height: '100%' }}>
                <img src={img} width='200px' alt='bus interior' />
              </Collapse>
            ))}
          </TransitionGroup>
        </Stack>
        <Button
          onClick={handleNextImg}
          disabled={props.imgLists.length >= props.imgPaths.length}
          sx={{ 
            p: 0, 
            minWidth: '20px', 
            color: '#EC9F46',
            backgroundColor: 'rgba(137, 146, 135, 0.2)', 
            borderRadius: '50%',
            m: '0.5em'
           }}
        >
          <NavigateNextRoundedIcon />
        </Button>
      </Box>
    )
  };

  return (
    <Box
      sx={{
        width: '90%',
        m: 'auto',
        mt: '2em',
        p: '1em 0',
        borderRadius: '20px',
        textAlign: 'center'
      }}>
      <Typography
        sx={{
          width: '90%',
          p: '10px',
          m: 'auto',
          mb: '30px',
          borderRadius: '10px',
          backgroundColor: '#EC9F46',
          color: '#FCFCFC'
        }}>
        버스 안내
      </Typography>
      <HeaderTypography busType={'25인승 소형'} />
      <ImgSlider
        imgPaths={smallBusImages}
        imgLists={smallBusLists}
        setImgLists={setSmallBusLists}
      />

      <HeaderTypography busType={'28인승 리무진'} />
      <ImgSlider
        imgPaths={limousineImages}
        imgLists={limousineLists}
        setImgLists={setLimousineLists}
      />

      <HeaderTypography busType={'45인승 대형'} />
      <ImgSlider
        imgPaths={bigBusImages}
        imgLists={bigBusLists}
        setImgLists={setBigBusLists}
      />

    </Box>
  )
};

export default MobileBus;