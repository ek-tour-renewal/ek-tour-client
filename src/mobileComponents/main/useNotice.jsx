import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoRoundedIcon from '@mui/icons-material/LooksTwoRounded';
import Looks3RoundedIcon from '@mui/icons-material/Looks3Rounded';
import Looks4RoundedIcon from '@mui/icons-material/Looks4Rounded';
import Looks5RoundedIcon from '@mui/icons-material/Looks5Rounded';
import Looks6RoundedIcon from '@mui/icons-material/Looks6Rounded';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import React from 'react';


const UseNotice = (props) => {
  function UseTypography (props) {
    return (
      <Typography
      sx={{
        fontSize: 'small',
        fontWeight: 'bold',
        color: '#5A4231'
        }}>
        {props.contents}
      </Typography>
    )
  };

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
      <Timeline position="alternate">
        <TimelineItem sx={{ width: '100%', p: 0 }}>
          <TimelineSeparator>
          <TimelineConnector />
            <LooksOneRoundedIcon sx={{ color: '#D3D3D3' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pt: 0, m: 'auto' }}>
            <UseTypography contents='견적요청' />
            <UseTypography contents='전화상담' />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem sx={{ width: '100%', p: 0 }}>
          <TimelineSeparator>
          <TimelineConnector />
            <LooksTwoRoundedIcon sx={{ color: '#D3D3D3' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pt: 0, m: 'auto' }}>
            <UseTypography contents='상담 후' />
            <UseTypography contents='견적서 제공' />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem sx={{ width: '100%', p: 0 }}>
          <TimelineSeparator>
          <TimelineConnector />
            <Looks3RoundedIcon sx={{ color: '#D3D3D3' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pt: 0, m: 'auto' }}>
          <UseTypography contents='계약금 입금' />
          <UseTypography contents='계약서 작성' />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem sx={{ width: '100%', p: 0 }}>
          <TimelineSeparator>
          <TimelineConnector />
            <Looks4RoundedIcon sx={{ color: '#D3D3D3' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pt: 0, m: 'auto' }}>
          <UseTypography contents='배차' />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem sx={{ width: '100%', p: 0 }}>
          <TimelineSeparator>
          <TimelineConnector />
            <Looks5RoundedIcon sx={{ color: '#D3D3D3' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pt: 0, m: 'auto' }}>
          <UseTypography contents='배차 후 기사님' />
          <UseTypography contents='확인 전화' />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem sx={{ width: '100%', p: 0 }}>
          <TimelineSeparator>
          <TimelineConnector />
            <Looks6RoundedIcon sx={{ color: '#D3D3D3' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pt: 0, m: 'auto' }}>
          <UseTypography contents='당일 출발' />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  )
};

export default UseNotice;