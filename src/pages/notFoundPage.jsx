import {Divider, Stack, Typography} from '@mui/material';
import React, {useEffect} from 'react';

export default function NotFoundPage() {
  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `NotFound`;
  }, []);

  return (
    <Stack p={10} spacing={3}>
      <Typography variant='h4' sx={{color: 'red', fontWeight: 'bold'}}>오류 발생</Typography>
      <Divider/>
      <Typography>해당 페이지를 찾을 수 없습니다.</Typography>
    </Stack>
  )
};