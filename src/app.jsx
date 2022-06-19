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

function App({ ektour }) {
  const [menu, setMenu] = useState(null);

  const changeMenu = (menu) => {
    setMenu(menu);
  };

  const getData = (data) => {
    ektour
      .pushData(data)
      .then(response => console.log(response))
      .catch(errors => console.log(errors));
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Main getData={getData} />} />
          <Route path='/introduce' element={<Company menu={menu} changeMenu={changeMenu} />} />
          <Route path='/notice' element={<BusNotice menu={menu} changeMenu={changeMenu} />} />
          <Route path='/smallbus' element={<SmallBus menu={menu} changeMenu={changeMenu} />} />
          <Route path='/limousine' element={<Limousine menu={menu} changeMenu={changeMenu} />} />
          <Route path='/bigbus' element={<BigBus menu={menu} changeMenu={changeMenu} />} />
          <Route path='/list' element={<EstimateList menu={menu} changeMenu={changeMenu} />} />
          <Route path='/request' element={<RequestEstimate menu={menu} changeMenu={changeMenu} getData={getData} />} />
          <Route path='/my' element={<MyEstimate menu={menu} changeMenu={changeMenu} />} />
          <Route path='/service' element={<ServiceCenter menu={menu} changeMenu={changeMenu} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
