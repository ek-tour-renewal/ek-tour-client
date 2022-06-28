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
  const [menus, setMenus] = useState([]);
  const [allPage, setAllPage] = useState(0);
  const [requestDataList, setRequestDataList] = useState([]);
  const [myData, setMyData] = useState(false);
  const [currentMyData, setCurrentMyData] = useState([{
    phone: null,
    password: null,
  }]);
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

  // subHeader, side 메뉴
  const changeMenu = (menu, menuList) => {
    setMenu(menu);
    setMenus(menuList);
  };

  // 견적 요청
  const submitData = (data) => {
    ektour
      .postData(data)
      .then(() => alert('견적 요청이 완료되었습니다.'))
      .catch(error => console.log(error))
  };

  // 견적요청하기
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

  // 견적 요청 목록 전체 페이지
  const getEstimateListPage = () => {
    ektour
      .getAllPageCount()
      .then(pages => setAllPage(pages.data.totalCount))
      .catch(error => console.log(error))
  };

  // 페이지별 견적 요청 목록
  const getEstimateList = (pageNumber) => {
    ektour
      .getData(pageNumber)
      .then(response => {
        setRequestDataList(response);
        console.log(response);
      })
      .catch(error => console.log(error))
  };

  // 나의 견적목록 전체 페이지
  const getMyEstimateListPage = (data) => {
    ektour
      .postMyEstimate(data, 0)
      .then(response => setAllPage(response.totalPage))
      .catch(error => console.log(error))
  };

  // 페이지별 나의 견적목록
  const postMyEstimateData = (pageNumber) => {
    ektour
      .postMyEstimate(currentMyData, pageNumber)
      .then(response => {
        setRequestDataList(response.estimateList);
      })
      .catch(error => console.log(error))
  };

  // 나의 견적 확인
  const checkMyEstimate = event => {
    event.preventDefault();
    const data = {
      phone: phoneFirstRef.current.value + phoneMiddleRef.current.value + phoneLastRef.current.value,
      password: passwordRef.current.value,
    };
    setCurrentMyData({ phone: data.phone, password: data.password });

    if (!checkMy()) {
      alert('정확하게 입력해 주세요');
      return false;
    } else {
      postMyEstimateData(data, 0);
      getMyEstimateListPage(data);
      formRef.current.reset();
    }
  }

  //견적요청 유효성검사
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

  // 나의 견적 확인 유효성 검사
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

  // 견적확인 나가기
  const exit = () => {
    setMyData(false);
    setCurrentMyData({ phone: null, password: null })
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Main
            logoURL={logoURL}
            Ref={Ref}
            getData={getData} />}
          />

          <Route path='/introduce' element={<Company
            logoURL={logoURL}
            menu={menu}
            changeMenu={changeMenu}
            menus={menus} />}
          />

          <Route path='/notice' element={<BusNotice
            logoURL={logoURL}
            menu={menu}
            changeMenu={changeMenu}
            menus={menus} />}
          />

          <Route path='/smallbus' element={<SmallBus
            logoURL={logoURL}
            menu={menu}
            changeMenu={changeMenu}
            menus={menus} />}
          />

          <Route path='/limousine' element={<Limousine
            menu={menu}
            changeMenu={changeMenu}
            menus={menus} />}
          />

          <Route path='/bigbus' element={<BigBus
            logoURL={logoURL}
            menu={menu}
            changeMenu={changeMenu}
            menus={menus} />}
          />

          <Route path='/list' element={<EstimateList
            logoURL={logoURL}
            menu={menu}
            changeMenu={changeMenu}
            getEstimateListPage={getEstimateListPage}
            getEstimateList={getEstimateList}
            allPage={allPage}
            requestDataList={requestDataList}
            menus={menus} />}
          />

          <Route path='/request' element={<RequestEstimate
            logoURL={logoURL}
            menu={menu}
            changeMenu={changeMenu}
            Ref={Ref}
            getData={getData}
            menus={menus} />}
          />

          <Route path='/my' element={<MyEstimate
            logoURL={logoURL}
            menu={menu}
            myData={myData}
            changeMenu={changeMenu}
            myRef={myRef}
            checkMyEstimate={checkMyEstimate}
            menus={menus}
            getMyEstimateListPage={getMyEstimateListPage} />}
          />

          <Route path='/my/list' element={<MyEstimateList
            logoURL={logoURL}
            menu={menu}
            myData={myData}
            changeMenu={changeMenu}
            getEstimateListPage={getEstimateListPage}
            postMyEstimateData={postMyEstimateData}
            allPage={allPage}
            requestDataList={requestDataList}
            exit={exit}
            menus={menus}
            currentMyData={currentMyData} />}
          />

          <Route path='/search/my/estimate' element={<MyEstimateData
            logoURL={logoURL}
            menu={menu}
            myData={myData}
            changeMenu={changeMenu}
            Ref={Ref}
            exit={exit}
            menus={menus} />}
          />

          <Route path='/service' element={<ServiceCenter
            logoURL={logoURL}
            menu={menu}
            changeMenu={changeMenu}
            menus={menus} />}
          />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
