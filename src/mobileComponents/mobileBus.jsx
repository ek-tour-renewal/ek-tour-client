import { Box, ImageList, ImageListItem, Typography, ImageListItemBar  } from '@mui/material';
import React from 'react';

const MobileBus = (props) => {
  // 이미지 폴더만 가져와서 map으로 가져오는 방법은 없을까
  const smallBusImages = [
    { url: './image/smallBusExterior.jpg', title: '외부' },
    { url: './image/smallBus/interior1.jpg', title: '내부 편의시설' },
    { url: './image/smallBus/interior2.jpg', title: '내부 편의시설' },
    { url: './image/smallBus/interior3.jpg', title: '내부 편의시설' },
    { url: './image/smallBus/interior4.jpg', title: '내부 편의시설' },
    { url: './image/smallBus/interior5.jpg', title: '내부 편의시설' },
    { url: './image/smallBus/interior6.jpg', title: '내부 편의시설' },
  ];
  const limousineImages = [
    { url: './image/limousineExterior.jpg', title: '외부' },
    { url: './image/limousine/interior1.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior2.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior3.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior4.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior5.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior6.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior7.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior8.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior9.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior10.jpg', title: '내부 편의시설' },
    { url: './image/limousine/interior11.jpg', title: '내부 편의시설' },
  ];
  const bigBusImages = [
    { url: './image/bigBusExterior.jpg', title: '외부' },
    { url: './image/bigBus/interior1.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior2.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior3.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior4.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior5.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior6.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior7.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior8.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior9.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior10.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior11.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior12.jpg', title: '내부 편의시설' },
    { url: './image/bigBus/interior13.jpg', title: '내부 편의시설' },
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
      <Box
        sx={{
          m: '1em auto',
          p: '0.5em',
          width: '85%'
        }}>
        <ImageList
          cols={props.imgPaths.length}
          gap={3}
          sx={{
            width: '255px',
            m: 'auto',
            border: '3px solid #D3D3D3',
            borderRadius: '10px'
          }}>
          {props.imgPaths.map((img) => (
            <ImageListItem sx={{ width: '240px' }}>
              <img src={`${img.url}`} alt='bus interior' />
              <ImageListItemBar
                title={img.title}
                position='below'
              />
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