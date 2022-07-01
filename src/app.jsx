import React, { useState } from 'react';
import styles from './app.module.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';
import Company from './components/company/company';
import BusNotice from './components/busNotice/busNotice';
import EstimateList from './components/estimateList/estimateList';
import RequestEstimate from './components/requestEstimate/requestEstimate';
import MyEstimate from './components/myEstimate/myEstimate';
import ServiceCenter from './components/serviceCenter/serviceCenter';
import NotFoundPage from './components/notFoundPage/notFoundPage';
import SideMenu from './components/sideMenu/sideMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App({ ektour }) {

  const [page, setPage] = useState('1');
  const changePage = (page) => {
    console.log(page);
    setPage(page);
  }

  return (
    <div className={styles.app}>
      <BrowserRouter>

        <Header />

        <SideMenu />

        {/* 페이지 라우팅 */}
        <Routes>
          <Route path='/' element={
            <Main
            
            />
          }></Route>

          <Route path='/introduce' element={
            <Company
            
            />
          }></Route>

          <Route path='/bus' element={
            <BusNotice
            
            />
          }></Route>

          <Route path='/estimate' element={
            <RequestEstimate
            
            />
          }></Route>

          <Route path='/estimate/list/1' element={
            <EstimateList
              ektour={ektour}
              page={page}
              changePage={changePage}
            />
          }></Route>

          <Route path={`/estimate/list/${page}`} element={
            <EstimateList
              ektour={ektour}
              page={page}
              changePage={changePage}
            />
          }></Route>

          <Route path='/estimate/my' element={
            <MyEstimate
            
            />
          }></Route>

          <Route path='/service-center' element={
            <ServiceCenter
            
            />
          }></Route>

          <Route path='*' element={
            <NotFoundPage />
          }></Route>
        </Routes>

        <Footer />
      
      </BrowserRouter>
    </div>
  );
}