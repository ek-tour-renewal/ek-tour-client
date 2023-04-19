import {MobileView} from "react-device-detect";
import {ErrorBoundary} from "react-error-boundary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Box} from "@mui/material";
import HeaderAppBar from "../mobileComponents/headerAppBar";
import MobileMain from "../mobileComponents/main/mobileMain";
import RequestForm from "../mobileComponents/myEstimate/mobileRequestForm";
import MobileMyEstimateList from "../mobileComponents/myEstimate/mobileMyEstimateList";
import MobileMyEstimateDetail from "../mobileComponents/myEstimate/mobileMyEstimateDetail";
import MobileServiceCenter from "../mobileComponents/serviceCenter/mobileServiceCenter";
import NotFoundPage from "../pages/notFoundPage";
import Footer from "../components/ui/footer/footer";
import React from "react";

export default function MobileRoute ({companyData}) {
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
                  />
                }></Route>

                <Route path='/mobile/myestimate/list/:page/:estimateId' element={
                  <MobileMyEstimateDetail
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
  )
}