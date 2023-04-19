import React from "react";
import {BrowserView} from "react-device-detect";
import {ErrorBoundary} from "react-error-boundary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "../components/ui/header/header";
import SideMenu from "../components/ui/sideMenu/sideMenu";
import Main from "../pages/main";
import Company from "../pages/company";
import Bus from "../pages/bus";
import EstimateList from "../pages/estimateList";
import EstimateDetail from "../pages/estimateDetail";
import MyEstimateList from "../pages/myEstimateList";
import ServiceCenter from "../pages/serviceCenter";
import NotFoundPage from "../pages/notFoundPage";
import Footer from "../components/ui/footer/footer";
import InquiryButton from "../components/ui/inquiry/inquiryButton";

export default function BrowserRoute({ExceptionHandler, companyData}) {
  return (
    <BrowserView>
      <ErrorBoundary FallbackComponent={ExceptionHandler}>
        <div className={'app'}>
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
                <EstimateDetail/>
              }></Route>

              <Route path='/estimate/my/list/:page' element={
                <MyEstimateList/>
              }></Route>

              <Route path='/estimate/my/list/:page/:estimateId' element={
                <EstimateDetail/>
              }></Route>

              <Route path='/service-center' element={
                <ServiceCenter/>
              }></Route>

              <Route path='*' element={
                <NotFoundPage/>
              }></Route>
            </Routes>

            <InquiryButton companyData={companyData}/>

            <Footer
              companyData={companyData}
            />

          </BrowserRouter>
        </div>
      </ErrorBoundary>
    </BrowserView>
  );
}