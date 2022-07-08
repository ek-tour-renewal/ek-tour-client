import { Box, Typography, Paper, Button, MobileStepper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import React, { useState } from 'react';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MobileBus = (props) => {
  const smallBusImages = [
    { label: '외관', url: './image/smallBusExterior.jpg' },
    { label: '내부1', url: './image/smallBus/interior1.jpg' },
    { label: '내부2', url: './image/smallBus/interior2.jpg' },
    { label: '내부3', url: './image/smallBus/interior3.jpg' },
    { label: '내부4', url: './image/smallBus/interior4.jpg' },
    { label: '내부5', url: './image/smallBus/interior5.jpg' },
    { label: '내부6', url: './image/smallBus/interior6.jpg' }
  ];

  const limousineImages = [
    { label: '외관', url: './image/limousineExterior.jpg' },
    { label: '내부1', url: './image/limousine/interior1.jpg' },
    { label: '내부2', url: './image/limousine/interior2.jpg' },
    { label: '내부3', url: './image/limousine/interior3.jpg' },
    { label: '내부4', url: './image/limousine/interior4.jpg' },
    { label: '내부5', url: './image/limousine/interior5.jpg' },
    { label: '내부6', url: './image/limousine/interior6.jpg' },
    { label: '내부7', url: './image/limousine/interior7.jpg' },
    { label: '내부8', url: './image/limousine/interior8.jpg' },
    { label: '내부9', url: './image/limousine/interior9.jpg' },
    { label: '내부10', url: './image/limousine/interior10.jpg' },
    { label: '내부11', url: './image/limousine/interior11.jpg' }
  ];

  const bigBusImages = [
    { label: '외관', url: './image/bigBusExterior.jpg' },
    { label: '내부1', url: './image/bigBus/interior1.jpg' },
    { label: '내부2', url: './image/bigBus/interior2.jpg' },
    { label: '내부3', url: './image/bigBus/interior3.jpg' },
    { label: '내부4', url: './image/bigBus/interior4.jpg' },
    { label: '내부5', url: './image/bigBus/interior5.jpg' },
    { label: '내부6', url: './image/bigBus/interior6.jpg' },
    { label: '내부7', url: './image/bigBus/interior7.jpg' },
    { label: '내부8', url: './image/bigBus/interior8.jpg' },
    { label: '내부9', url: './image/bigBus/interior9.jpg' },
    { label: '내부10', url: './image/bigBus/interior10.jpg' },
    { label: '내부11', url: './image/bigBus/interior11.jpg' },
    { label: '내부12', url: './image/bigBus/interior12.jpg' },
    { label: '내부13', url: './image/bigBus/interior13.jpg' }
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [limousineStep, setLimousineStep] = useState(0);
  const [bigBusStep, setBigBusStep] = useState(0);

  const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1) };
  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) };
  const handleStepChange = (step) => { setActiveStep(step) };

  const handleLimousineNext = () => { setLimousineStep((prevActiveStep) => prevActiveStep + 1) };
  const handleLimousineBack = () => { setLimousineStep((prevActiveStep) => prevActiveStep - 1) };
  const handleLimousineStepChange = (step) => { setLimousineStep(step) };

  const handleBigBusNext = () => { setBigBusStep((prevActiveStep) => prevActiveStep + 1) };
  const handleBigBusBack = () => { setBigBusStep((prevActiveStep) => prevActiveStep - 1) };
  const handleBigBusStepChange = (step) => { setBigBusStep(step) };

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

      <Box sx={{ maxWidth: '250px', flexGrow: 1, border: '2px solid #D3D3D3', borderRadius: '10px', m: '0 auto' }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
            borderRadius: '10px'
          }}
        >
          <Typography>{smallBusImages[activeStep].label}</Typography>
        </Paper>

        <Box sx={{ display: 'flex' }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {smallBusImages.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: '150px',
                      display: 'block',
                      maxWidth: '230px',
                      overflow: 'hidden',
                      width: '100%',
                      m: '0 auto'
                    }}
                    src={step.url}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </Box>

        <MobileStepper
          sx={{ borderRadius: '10px' }}
          variant='text'
          steps={smallBusImages.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === smallBusImages.length - 1}
              sx={{ color: '#EC9F46' }}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ color: '#EC9F46' }}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </Box>

      <HeaderTypography busType={'28인승 리무진'} />

      <Box sx={{ maxWidth: '250px', flexGrow: 1, border: '2px solid #D3D3D3', borderRadius: '10px', m: '0 auto' }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
            borderRadius: '10px'
          }}
        >
          <Typography>{limousineImages[limousineStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={limousineStep}
          onChangeIndex={handleLimousineStepChange}
          enableMouseEvents
        >
          {limousineImages.map((step, index) => (
            <div key={step.label}>
              {Math.abs(limousineStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: '150px',
                    display: 'block',
                    maxWidth: '230px',
                    overflow: 'hidden',
                    width: '100%',
                    m: '0 auto'
                  }}
                  src={step.url}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          sx={{ borderRadius: '10px' }}
          variant='text'
          steps={limousineImages.length}
          position="static"
          activeStep={limousineStep}
          nextButton={
            <Button
              size="small"
              onClick={handleLimousineNext}
              disabled={limousineStep === limousineImages.length - 1}
              sx={{ color: '#EC9F46' }}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleLimousineBack}
              disabled={limousineStep === 0}
              sx={{ color: '#EC9F46' }}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </Box>

      <HeaderTypography busType={'45인승 대형'} />

      <Box sx={{ maxWidth: '250px', flexGrow: 1, border: '2px solid #D3D3D3', borderRadius: '10px', m: '0 auto' }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
            borderRadius: '10px'
          }}
        >
          <Typography>{bigBusImages[bigBusStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={bigBusStep}
          onChangeIndex={handleBigBusStepChange}
          enableMouseEvents
        >
          {bigBusImages.map((step, index) => (
            <div key={step.label}>
              {Math.abs(bigBusStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: '150px',
                    display: 'block',
                    maxWidth: '230px',
                    overflow: 'hidden',
                    width: '100%',
                    m: '0 auto'
                  }}
                  src={step.url}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          sx={{ borderRadius: '10px' }}
          variant='text'
          steps={bigBusImages.length}
          position="static"
          activeStep={bigBusStep}
          nextButton={
            <Button
              size="small"
              onClick={handleBigBusNext}
              disabled={bigBusStep === bigBusImages.length - 1}
              sx={{ color: '#EC9F46' }}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBigBusBack}
              disabled={bigBusStep === 0}
              sx={{ color: '#EC9F46' }}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </Box>



    </Box>
  )
};

export default MobileBus;
