import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import BigBus from './components/bigBus/bigBus';
import BusNotice from './components/busNotice/busNotice';
import Company from './components/company/company';
import EstimateList from './components/estimateList/estimateList';
import Limousine from './components/limousine/limousine';
import Main from './components/main/main';
import MyEstimate from './components/myEstimate/myEstimate';
import RequestEstimate from './components/requestEstimate/requestEstimate';
import ServiceCenter from './components/serviceCenter/serviceCenter';
import SmallBus from './components/smallBus/smallBus';

function App() {
  const [data, setData] = useState([
    {
      travel: null,
      name: null,
      phone: null,
      password: null,
      email: null,
      departDate: null,
      arrivalDate: null,
      departPlace: null,
      arrivalPlace: null,
      vehicle: null,
      vehicleNumber : null
    }
  ]);

  const getData = estimation => {
    setData(estimation);
    console.log(estimation);
  };
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Main getData={getData}/>} />
          <Route path='/introduce' element={<Company />} />
          <Route path='/notice' element={<BusNotice />} />
          <Route path='/smallbus' element={<SmallBus />} />
          <Route path='/limousine' element={<Limousine />} />
          <Route path='/bigbus' element={<BigBus />} />
          <Route path='/list' element={<EstimateList />} />
          <Route path='/request' element={<RequestEstimate />} />
          <Route path='/my' element={<MyEstimate />} />
          <Route path='/service' element={<ServiceCenter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
