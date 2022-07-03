import React from 'react';
import styles from './app.module.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';
import Company from './components/company/company';
import Bus from './components/bus/bus';
import EstimateList from './components/estimateList/estimateList';
import RequestEstimate from './components/requestEstimate/requestEstimate';
import ServiceCenter from './components/serviceCenter/serviceCenter';
import NotFoundPage from './components/notFoundPage/notFoundPage';
import SideMenu from './components/sideMenu/sideMenu';
import FloatingActionButton from './components/sideMenu/floatingActionButton';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyEstimateList from './components/myEstimateList/myEstimateList';

export default function App({ ektour }) {

  return (
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
            <Company />
          }></Route>

          <Route path='/bus' element={
            <Bus />
          }></Route>

          <Route path='/estimate' element={
            <RequestEstimate
            
            />
          }></Route>

          <Route path='/estimate/list/:page' element={
            <EstimateList
              ektour={ektour}
            />
          }></Route>

          <Route path='/estimate/list/:page/:estimateId' element={
            <EstimateList
              ektour={ektour}
            />
          }></Route>

          <Route path='/estimate/my/list/:page' element={
            <MyEstimateList
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

        <FloatingActionButton />

        <Footer/>
      
      </BrowserRouter>
    </div>
  );
}