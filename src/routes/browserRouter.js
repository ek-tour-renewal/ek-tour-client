import React from "react";
import {BrowserView} from "react-device-detect";
import {ErrorBoundary} from "react-error-boundary";
import styles from "../app.module.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "../components/ui/header/header";
import SideMenu from "../components/sideMenu/sideMenu";
import Main from "../pages/main/main";
import Company from "../pages/company/company";
import Bus from "../pages/bus/bus";
import EstimateList from "../pages/estimateList/estimateList";
import EstimateDetail from "../pages/estimateDetail/estimateDetail";
import MyEstimateList from "../pages/myEstimateList/myEstimateList";
import ServiceCenter from "../pages/serviceCenter/serviceCenter";
import NotFoundPage from "../pages/notFoundPage/notFoundPage";
import FloatingActionButton from "../components/sideMenu/floatingActionButton";
import Footer from "../components/ui/footer/footer";

export default function BrowserRoute({ExceptionHandler, companyData}) {
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