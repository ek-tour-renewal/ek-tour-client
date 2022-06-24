import React, { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import BigBus from './components/bigBus/bigBus';
import BusNotice from './components/busNotice/busNotice';
import Company from './components/company/company';
import EstimateList from './components/estimateList/estimateList';
import Limousine from './components/limousine/limousine';
import Main from './components/main/main';
import MyEstimate from './components/myEstimate/myEstimate';
import MyEstimateList from './components/myEstimateList/myEstimateList';
import NotFoundPage from './components/notFoundPage/notFoundPage';
import RequestEstimate from './components/requestEstimate/requestEstimate';
import ServiceCenter from './components/serviceCenter/serviceCenter';
import SmallBus from './components/smallBus/smallBus';

function App({ ektour }) {
  const [menu, setMenu] = useState(null);
  const [allPage, setAllPage] = useState(0);
  const [requestDataList, setRequestDataList] = useState([]);
  const [myData, setMyData] = useState(false);

  useEffect(() => {
    ektour
      .requestData(0)
      .then(response => {
        setRequestDataList(response);
        console.log(response);
      })
      .catch(error => console.log(error))
  }, [])

  const changeMenu = (menu) => {
    setMenu(menu);
  };

  const submitData = (data) => {
    ektour
      .pushData(data)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const getEstimateListPage = () => {
    ektour
      .getAllPageCount()
      .then(pages => setAllPage(pages.data.totalCount))
      .catch(error => console.log(error))
  };

  const getEstimateList = (pageNumber) => {
    ektour
      .requestData(pageNumber)
      .then(response => {
        setRequestDataList(response);
        console.log(response);
      })
      .catch(error => console.log(error))
  }

  const getMyEstimateData = (data) => {
    ektour
      .getMyEstimate(data)
      .then(response => {
        setMyData(true);
        setRequestDataList(response);
        console.log(response);
      })
      .catch(error => alert('정확한 정보를 입력해 주세요'));
  };

  const exit = () => {
    setMyData(false);
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Main submitData={submitData} />} />
          <Route path='/introduce' element={<Company menu={menu} changeMenu={changeMenu} />} />
          <Route path='/notice' element={<BusNotice menu={menu} changeMenu={changeMenu} />} />
          <Route path='/smallbus' element={<SmallBus menu={menu} changeMenu={changeMenu} />} />
          <Route path='/limousine' element={<Limousine menu={menu} changeMenu={changeMenu} />} />
          <Route path='/bigbus' element={<BigBus menu={menu} changeMenu={changeMenu} />} />
          <Route path='/list' element={<EstimateList
            menu={menu}
            changeMenu={changeMenu}
            getEstimateListPage={getEstimateListPage}
            getEstimateList={getEstimateList}
            allPage={allPage}
            requestDataList={requestDataList} />}
          />
          <Route path='/request' element={<RequestEstimate menu={menu} changeMenu={changeMenu} submitData={submitData} />} />
          <Route path='/search' element={<MyEstimate menu={menu} myData={myData} changeMenu={changeMenu} getMyEstimateData={getMyEstimateData} />} />
          <Route path='/search/my' element={<MyEstimateList
            menu={menu}
            myData={myData}
            changeMenu={changeMenu}
            getEstimateListPage={getEstimateListPage}
            getMyEstimateData={getMyEstimateData}
            allPage={allPage}
            requestDataList={requestDataList}
            exit={exit} />}
          />
          <Route path='/service' element={<ServiceCenter menu={menu} changeMenu={changeMenu} />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
