import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import Footer from './components/ui/footer/footer';
import Header from './components/ui/header/header';
import Main from './pages/main/main';
import Company from './pages/company/company';
import Bus from './pages/bus/bus';
import EstimateList from './pages/estimateList/estimateList';
import ServiceCenter from './pages/serviceCenter/serviceCenter';
import SideMenu from './components/sideMenu/sideMenu';
import FloatingActionButton from './components/sideMenu/floatingActionButton';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MyEstimateList from './pages/myEstimateList/myEstimateList';
import {Box, Divider, Stack, Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';
import EstimateDetail from './pages/estimateDetail/estimateDetail';
import NotFoundPage from './pages/notFoundPage/notFoundPage';
import {BrowserView, isBrowser, MobileView} from 'react-device-detect';
import HeaderAppBar from './mobileComponents/headerAppBar';
import MobileMain from './mobileComponents/main/mobileMain';
import RequestForm from './mobileComponents/myEstimate/mobileRequestForm';
import MobileMyEstimateList from './mobileComponents/myEstimate/mobileMyEstimateList';
import MobileMyEstimateDetail from './mobileComponents/myEstimate/mobileMyEstimateDetail';
import MobileServiceCenter from './mobileComponents/serviceCenter/mobileServiceCenter';

function ExceptionHandler({error}) {
  return (
    <Stack p={10} spacing={3}>
      <Typography variant='h4' sx={{color: 'red', fontWeight: 'bold'}}>에러 발생</Typography>
      <Divider/>
      <Typography>{error.message ? error.message : '알 수 없는 오류'}</Typography>
    </Stack>
  );
}

export default function App({ektour}) {

  const [companyData, setCompanyData] = useState({
    adminName: null,
    infoHandlerName: null,
    businessNum: null,
    registrationNum: null,
    address: null,
    tel: null,
    fax: null,
    phone: null,
    email: null,
    accountBank: null,
    accountNum: null,
    accountHolder: null,
    kakaoTalkId: null,
  });

  useEffect(() => {
    ektour.getCompanyInfo()
      .then(response => {
        setCompanyData(response)
      })
      .catch(error => console.log(error));
  }, []);

  // PC 렌더링
  if (isBrowser) {
    return (
      <BrowserView>
        <ErrorBoundary FallbackComponent={ExceptionHandler}>
          <div className={styles.app}>
            <BrowserRouter>

              <Header/>

              <SideMenu/>

              {/* 페이지 라우팅 */}
              <Routes>
                <Route path='/' element={
                  <Main/>
                }></Route>

                <Route path='/introduce' element={
                  <Company
                    companyData={companyData}
                  />
                }></Route>

                <Route path='/bus' element={
                  <Bus/>
                }></Route>

                <Route path='/estimate/list/:page' element={
                  <EstimateList/>
                }></Route>

                <Route path='/estimate/list/:page/:estimateId' element={
                  <EstimateDetail />
                }></Route>

                <Route path='/estimate/my/list/:page' element={
                  <MyEstimateList/>
                }></Route>

                <Route path='/estimate/my/list/:page/:estimateId' element={
                  <EstimateDetail />
                }></Route>

                <Route path='/service-center' element={
                  <ServiceCenter/>
                }></Route>

                <Route path='*' element={
                  <NotFoundPage/>
                }></Route>
              </Routes>

              <FloatingActionButton
                companyData={companyData}
              />

              <Footer
                companyData={companyData}
              />

            </BrowserRouter>
          </div>
        </ErrorBoundary>
      </BrowserView>
    );
  }
  // 모바일 렌더링
  else {
    return (
      <MobileView>
        <ErrorBoundary>
          <BrowserRouter>
            <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw'}}>
              <Box sx={{flex: 1}}>

                {/* 헤더 AppBar */}
                <HeaderAppBar/>

                {/* 컨텐츠 라우팅 */}
                <Routes>
                  <Route path='/' element={<MobileMain/>}></Route>

                  <Route path='/mobile/myestimate' element={
                    <RequestForm/>
                  }></Route>

                  <Route path='/mobile/myestimate/list/:page' element={
                    <MobileMyEstimateList
                      ektour={ektour}
                    />
                  }></Route>

                  <Route path='/mobile/myestimate/list/:page/:estimateId' element={
                    <MobileMyEstimateDetail
                      ektour={ektour}
                    />
                  }></Route>

                  <Route path='/mobile/service-center' element={
                    <MobileServiceCenter
                      companyData={companyData}
                    />
                  }></Route>

                  <Route path='/*' element={
                    <NotFoundPage/>
                  }></Route>
                </Routes>

              </Box>
              {/* 푸터(회사 정보 렌더) */}
              <Footer companyData={companyData}/>
            </Box>
          </BrowserRouter>
        </ErrorBoundary>
      </MobileView>
    );
  }
}