import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import React from 'react';

const MobileBus = (props) => {
  const smallBusImages = [
    { url: './image/smallBusExterior.jpg' },
    { url: './image/smallBus/interior1.jpg' },
    { url: './image/smallBus/interior2.jpg' },
    { url: './image/smallBus/interior3.jpg' },
    { url: './image/smallBus/interior4.jpg' },
    { url: './image/smallBus/interior5.jpg' },
    { url: './image/smallBus/interior6.jpg' },
  ];
  const limousineImages = [
    { url: './image/limousineExterior.jpg' },
    { url: './image/limousine/interior1.jpg' },
    { url: './image/limousine/interior2.jpg' },
    { url: './image/limousine/interior3.jpg' },
    { url: './image/limousine/interior4.jpg' },
    { url: './image/limousine/interior5.jpg' },
    { url: './image/limousine/interior6.jpg' },
    { url: './image/limousine/interior7.jpg' },
    { url: './image/limousine/interior8.jpg' },
    { url: './image/limousine/interior9.jpg' },
    { url: './image/limousine/interior10.jpg' },
    { url: './image/limousine/interior11.jpg' },
  ];
  const bigBusImages = [
    { url: './image/bigBusExterior.jpg' },
    { url: './image/bigBus/interior1.jpg' },
    { url: './image/bigBus/interior2.jpg' },
    { url: './image/bigBus/interior3.jpg' },
    { url: './image/bigBus/interior4.jpg' },
    { url: './image/bigBus/interior5.jpg' },
    { url: './image/bigBus/interior6.jpg' },
    { url: './image/bigBus/interior7.jpg' },
    { url: './image/bigBus/interior8.jpg' },
    { url: './image/bigBus/interior9.jpg' },
    { url: './image/bigBus/interior10.jpg' },
    { url: './image/bigBus/interior11.jpg' },
    { url: './image/bigBus/interior12.jpg' },
    { url: './image/bigBus/interior13.jpg' },
  ];

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
    return (
      <Box sx={{display: 'flex', flexWrap: 'wrap', m: '0 auto', width: '85%'}}>
      <img src={props.imgPaths[0].url} width= '300px'></img>
      <ImageList 
      cols={props.imgPaths.length} 
      gap={3} 
      sx={{ width: '240px', m: 'auto' }}>
        {props.imgPaths.map((img) => (
          <ImageListItem sx={{ width: '200px' }}>
            <img src={`${img.url}`} alt="bus interior" />
          </ImageListItem>
        ))}
      </ImageList>
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
          width: 'max-content',
          p: '10px',
          m: 'auto',
          mb: '30px',
          borderRadius: '10px',
          backgroundColor: '#EC9F46',
          color: '#FCFCFC'
        }}>
        버스 안내
      </Typography>

      {/* tooltip처럼 이미지를 드래그해서 보라는 멘트를 띄울 수 있는 방법은 없나 */}
      <HeaderTypography busType={'25인승 소형'} />
      <ImgSlider imgPaths={smallBusImages} />

      <HeaderTypography busType={'28인승 리무진'} />
      <ImgSlider imgPaths={limousineImages} />

      <HeaderTypography busType={'45인승 대형'} />
      <ImgSlider imgPaths={bigBusImages} />

    </Box>
  )
};

export default MobileBus;