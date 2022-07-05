import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';
import Company from './components/company/company';
import Bus from './components/bus/bus';
import EstimateList from './components/estimateList/estimateList';
// import RequestEstimate from './components/requestEstimate/requestEstimate';
import ServiceCenter from './components/serviceCenter/serviceCenter';
import SideMenu from './components/sideMenu/sideMenu';
import FloatingActionButton from './components/sideMenu/floatingActionButton';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyEstimateList from './components/myEstimateList/myEstimateList';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import EstimateDetail from './components/estimateDetail/estimateDetail';
import NotFoundPage from './components/notFoundPage/notFoundPage';
import { BrowserView, isBrowser, MobileView } from 'react-device-detect';
import HeaderAppBar from './mobileComponents/headerAppBar';
import CompanyMobile from './mobileComponents/mobileCompany';
import MobileMain from './mobileComponents/mobileMain';
import RequestForm from './mobileComponents/myEstimate/mobileRequestForm';
import MobileMyEstimateList from './mobileComponents/myEstimate/mobileMyEstimateList';

function ExceptionHandler({error}) {

  return (
    <Stack p={10} spacing={3}>
      <Typography variant='h4' sx={{color: 'red', fontWeight: 'bold'}}>에러 발생</Typography>
      <Divider />
      <Typography>{error.message ? error.message : '알 수 없는 오류'}</Typography>
    </Stack>
  );
}

export default function App({ ektour }) {

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
  });

  useEffect(() => {
    ektour.getCompanyInfo()
      .then(response => { setCompanyData(response) })
      .catch(error => console.log(error));
  }, []);
  
  // PC 렌더링
  if (isBrowser) {
    return (
      <BrowserView>
      <ErrorBoundary FallbackComponent={ExceptionHandler}>
      <div className={styles.app}>
        <BrowserRouter>

          <Header
            ektour={ektour}
          />

          <SideMenu
            ektour={ektour}
          />

          {/* 페이지 라우팅 */}
          <Routes>
            <Route path='/' element={
              <Main />
            }></Route>

            <Route path='/introduce' element={
              <Company
              companyData={companyData}
            />
            }></Route>

            <Route path='/bus' element={
              <Bus />
            }></Route>

            {/* <Route path='/estimate' element={
              <RequestEstimate

              />
            }></Route> */}

            <Route path='/estimate/list/:page' element={
              <EstimateList
                ektour={ektour}
              />
            }></Route>

            <Route path='/estimate/list/:page/:estimateId' element={
              <EstimateDetail
                ektour={ektour}
              />
            }></Route>

            <Route path='/estimate/my/list/:page' element={
              <MyEstimateList
                ektour={ektour}
              />
            }></Route>

            <Route path='/estimate/my/list/:page/:estimateId' element={
              <EstimateDetail
                ektour={ektour}
              />
            }></Route>

            <Route path='/service-center' element={
              <ServiceCenter />
            }></Route>

            <Route path='*' element={
              <NotFoundPage />
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
            <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <Box sx={{flex: 1}}>
            
            {/* 헤더 AppBar */}
            <HeaderAppBar />

            {/* 컨텐츠 라우팅 */}
            <Routes>
              <Route path='/' element={<MobileMain />}></Route>

              <Route path='/mobile' element={<MobileMain />}></Route>
              
              <Route path='/mobile/introduce' element={<CompanyMobile />}></Route>

              <Route path='/mobile/myestimate' element={
                <RequestForm />
              }></Route>

              <Route path='/mobile/myestimate/list/:page' element={
                <MobileMyEstimateList 
                  ektour={ektour}
                />
              }></Route>

              <Route path='/mobile/service-center' element={
                '고객센터'
              }></Route>

              <Route path='/*' element={
                '에러 페이지'
              }></Route>
            </Routes>

            </Box>
            {/* 푸터(회사 정보 렌더) */}
            <Footer companyData={companyData} />
            </Box>
          </BrowserRouter>
        </ErrorBoundary>
      </MobileView>
    );
  }
}