import {isBrowser} from 'react-device-detect';
import {Divider, Stack, Typography} from '@mui/material';
import BrowserRoute from "./routes/browserRouter";
import MobileRoute from "./routes/mobileRouter";
import useGetCompanyInfo from "./hooks/useGetCompanyInfo";

function ExceptionHandler({error}) {
  return (
    <Stack p={10} spacing={3}>
      <Typography variant='h4' sx={{color: 'red', fontWeight: 'bold'}}>에러 발생</Typography>
      <Divider/>
      <Typography>{error.message ? error.message : '알 수 없는 오류'}</Typography>
    </Stack>
  );
}

export default function App() {
  const companyData = useGetCompanyInfo();

  // PC 렌더링
  if (isBrowser) {
    return <BrowserRoute companyData={companyData} ExceptionHandler={ExceptionHandler}/>
  }
  // 모바일 렌더링
  else {
    return (
      <MobileRoute companyData={companyData}/>
    );
  }
}