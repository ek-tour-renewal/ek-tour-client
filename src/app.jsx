import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import BigBus from './components/bigBus/bigBus';
import BusNotice from './components/busNotice/busNotice';
import Company from './components/company/company';
import EstimateList from './components/estimateList/estimateList';
import Limousine from './components/limousine/limousine';
import Main from './components/main/main';
import MyEstimate from './components/myEstimate/myEstimate';
import MyEstimateData from './components/myEstimateData/myEstimateData';
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
  const [logoURL, setLogoURL] = useState();

  const formRef = useRef();
  const travelRef = useRef();
  const nameRef = useRef();
  const phoneFirstRef = useRef();
  const phoneMiddleRef = useRef();
  const phoneLastRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const departDateRef = useRef();
  const arrivalDateRef = useRef();
  const departPlaceRef = useRef();
  const departPlaceDetailRef = useRef();
  const arrivalPlaceRef = useRef();
  const arrivalPlaceDetailRef = useRef();
  const vehicleRef = useRef();
  const vehicleNumberRef = useRef();
  const memberCountRef = useRef();
  const memoRef = useRef();
  const stopPlaceRef = useRef();
  const aroundWayTypeRef = useRef();
  const cashRef = useRef();
  const taxBillRef = useRef();

  const Ref = { formRef, travelRef, nameRef, phoneFirstRef, phoneMiddleRef, phoneLastRef, passwordRef, emailRef, departDateRef, arrivalDateRef, departPlaceRef, departPlaceDetailRef, arrivalPlaceRef, arrivalPlaceDetailRef, vehicleRef, vehicleNumberRef, memberCountRef, memoRef, stopPlaceRef, aroundWayTypeRef, cashRef, taxBillRef };
  const myRef = { formRef, phoneFirstRef, phoneMiddleRef, phoneLastRef, passwordRef };

  useEffect(() => {
    ektour
      .getData(0)
      .then(response => {
        setRequestDataList(response);
        console.log(response);
      })
      .catch(error => console.log(error))
    ektour
      .getLogo()
      .then(response => {
        setLogoURL(response);
        console.log(response);
      })
      .catch(error => console.log(error))
  }, [])

  const changeMenu = (menu) => {
    setMenu(menu);
  };

  const submitData = (data) => {
    ektour
      .postData(data)
      .then(() => alert('견적 요청이 완료되었습니다.'))
      .catch(error => console.log(error))
  };

  const putData = (data) => {
    ektour
      .putData(data)
      .then(() => alert('견적 요청이 완료되었습니다.'))
      .catch(error => console.log(error))
  };

  const getEstimateListPage = () => {
    ektour
      .getAllPageCount()
      .then(pages => setAllPage(pages.data.totalCount))
      .catch(error => console.log(error))
  };

  const getEstimateList = (pageNumber) => {
    ektour
      .getData(pageNumber)
      .then(response => {
        setRequestDataList(response);
        console.log(response);
      })
      .catch(error => console.log(error))
  };

  const postMyEstimateData = (data) => {
    ektour
      .postMyEstimate(data)
      .then(response => {
        setRequestDataList(response);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const deleteData = (data) => {
    ektour.deleteData(data)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  };

  const checkAll = () => {
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const numberRegex = /^[0-9]{4}$/;
    if (!nameRef.current.value) {
      return false;
    } else if (!emailRef.current.value || !emailRegex.test(emailRef.current.value)) {
      return false;
    } else if (!phoneMiddleRef.current.value || !numberRegex.test(phoneMiddleRef.current.value)) {
      return false;
    } else if (!phoneLastRef.current.value || !numberRegex.test(phoneLastRef.current.value)) {
      return false;
    } else if (!passwordRef.current.value || !numberRegex.test(passwordRef.current.value)) {
      return false;
    } else if (!memberCountRef.current.value) {
      return false;
    } else if (!departDateRef.current.value || !arrivalDateRef.current.value) {
      return false;
    }
    return true;
  };

  const checkMy = () => {
    const numberRegex = /^[0-9]{4}$/;
    if (!phoneMiddleRef.current.value || !numberRegex.test(phoneMiddleRef.current.value)) {
      return false;
    } else if (!phoneLastRef.current.value || !numberRegex.test(phoneLastRef.current.value)) {
      return false;
    } else if (!passwordRef.current.value || !numberRegex.test(passwordRef.current.value)) {
      return false;
    }
    setMyData(true);
    return true;
  };

  const getData = (event) => {
    event.preventDefault();
    const estimation = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneFirstRef.current.value + phoneMiddleRef.current.value + phoneLastRef.current.value,
      password: passwordRef.current.value,
      travelType: travelRef.current.value,
      vehicleType: vehicleRef.current.value,
      vehicleNumber: vehicleNumberRef.current.value,
      memberCount: memberCountRef.current.value,
      departDate: departDateRef.current.value,
      arrivalDate: arrivalDateRef.current.value,
      departPlace: `${departPlaceRef.current.value} ${departPlaceDetailRef.current.value}`,
      arrivalPlace: `${Ref.arrivalPlaceRef.current.value} ${arrivalPlaceDetailRef.current.value}`,
      memo: memoRef.current.value ? memoRef.current.value : null,
      stopPlace: stopPlaceRef.current.value,
      wayType: aroundWayTypeRef.current.checked ? '왕복' : '편도',
      payment: cashRef.current.checked ? '현금' : '카드',
      taxBill: taxBillRef.current.checked,
    };

    if (!checkAll()) {
      alert('정확하게 입력해 주세요');
    } else {
      submitData(estimation);
      formRef.current.reset();
    };
  };

  const putMyData = (event) => {
    event.preventDefault();
    const estimation = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneFirstRef.current.value + phoneMiddleRef.current.value + phoneLastRef.current.value,
      password: passwordRef.current.value,
      travelType: travelRef.current.value,
      vehicleType: vehicleRef.current.value,
      vehicleNumber: vehicleNumberRef.current.value,
      memberCount: memberCountRef.current.value,
      departDate: departDateRef.current.value,
      arrivalDate: arrivalDateRef.current.value,
      departPlace: `${departPlaceRef.current.value} ${departPlaceDetailRef.current.value}`,
      arrivalPlace: `${Ref.arrivalPlaceRef.current.value} ${arrivalPlaceDetailRef.current.value}`,
      memo: memoRef.current.value ? memoRef.current.value : null,
      stopPlace: stopPlaceRef.current.value,
      wayType: aroundWayTypeRef.current.checked ? '왕복' : '편도',
      payment: cashRef.current.checked ? '현금' : '카드',
      taxBill: taxBillRef.current.checked,
    };

    if (!checkAll()) {
      alert('정확하게 입력해 주세요');
    } else {
      putData(estimation);
      formRef.current.reset();
    }
  };

  const checkMyEstimate = event => {
    event.preventDefault();
    const data = {
      phone: phoneFirstRef.current.value + phoneMiddleRef.current.value + phoneLastRef.current.value,
      password: passwordRef.current.value,
    };

    if (!checkMy()) {
      alert('정확하게 입력해 주세요');
      return false;
    } else {
      postMyEstimateData(data);
      formRef.current.reset();
    }
  }

  const deleteMyData = (event) => {
    event.preventDefault();
    const estimation = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneFirstRef.current.value + phoneMiddleRef.current.value + phoneLastRef.current.value,
      password: passwordRef.current.value,
      travelType: travelRef.current.value,
      vehicleType: vehicleRef.current.value,
      vehicleNumber: vehicleNumberRef.current.value,
      memberCount: memberCountRef.current.value,
      departDate: departDateRef.current.value,
      arrivalDate: arrivalDateRef.current.value,
      departPlace: `${departPlaceRef.current.value} ${departPlaceDetailRef.current.value}`,
      arrivalPlace: `${Ref.arrivalPlaceRef.current.value} ${arrivalPlaceDetailRef.current.value}`,
      memo: memoRef.current.value ? memoRef.current.value : null,
      stopPlace: stopPlaceRef.current.value,
      wayType: aroundWayTypeRef.current.checked ? '왕복' : '편도',
      payment: cashRef.current.checked ? '현금' : '카드',
      taxBill: taxBillRef.current.checked,
    };

    if (!checkAll()) {
      alert('정확하게 입력해 주세요');
    } else {
      deleteData(estimation);
      formRef.current.reset();
    }
  };

  const exit = () => {
    setMyData(false);
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Main logoURL={logoURL} Ref={Ref} getData={getData} />} />
          <Route path='/introduce' element={<Company logoURL={logoURL} menu={menu} changeMenu={changeMenu} />} />
          <Route path='/notice' element={<BusNotice logoURL={logoURL} menu={menu} changeMenu={changeMenu} />} />
          <Route path='/smallbus' element={<SmallBus logoURL={logoURL} menu={menu} changeMenu={changeMenu} />} />
          <Route path='/limousine' element={<Limousine menu={menu} changeMenu={changeMenu} />} />
          <Route path='/bigbus' element={<BigBus logoURL={logoURL} menu={menu} changeMenu={changeMenu} />} />
          <Route path='/list' element={<EstimateList
            logoURL={logoURL}
            menu={menu}
            changeMenu={changeMenu}
            getEstimateListPage={getEstimateListPage}
            getEstimateList={getEstimateList}
            allPage={allPage}
            requestDataList={requestDataList} />}
          />
          <Route path='/request' element={<RequestEstimate
            logoURL={logoURL}
            menu={menu}
            changeMenu={changeMenu}
            Ref={Ref}
            getData={getData} />}
          />
          <Route path='/search' element={<MyEstimate logoURL={logoURL} menu={menu} myData={myData} changeMenu={changeMenu} getMyEstimateData={postMyEstimateData} myRef={myRef} checkMyEstimate={checkMyEstimate} />} />
          <Route path='/search/my' element={<MyEstimateList
            logoURL={logoURL}
            menu={menu}
            myData={myData}
            changeMenu={changeMenu}
            getEstimateListPage={getEstimateListPage}
            getMyEstimateData={postMyEstimateData}
            allPage={allPage}
            requestDataList={requestDataList}
            exit={exit} />}
          />
          <Route path='/search/my/estimate' element={<MyEstimateData
            logoURL={logoURL}
            menu={menu}
            myData={myData}
            changeMenu={changeMenu}
            Ref={Ref}
            updateMyData={putMyData}
            deleteMyData={deleteMyData}
            exit={exit} />} />
          <Route path='/service' element={<ServiceCenter logoURL={logoURL} menu={menu} changeMenu={changeMenu} />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
