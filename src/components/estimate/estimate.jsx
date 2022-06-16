import React, { useRef } from 'react';
import styles from './estimate.module.css';

const Estimate = ({ getData }) => {
  const formRef = useRef();
  const travelRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const departDateRef = useRef();
  const arrivalDateRef = useRef();
  const departPlaceRef = useRef();
  const arrivalPlaceRef = useRef();
  const vehicleRef = useRef();
  const vehicleNumberRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const estimation = {
      name: nameRef.current.value || '',
      email: emailRef.current.value || '',
      phone: phoneRef.current.value || '',
      password: passwordRef.current.value || '',
      travelType: travelRef.current.value || '',
      vehicleType: vehicleRef.current.value || '',
      vehicleNumber: vehicleNumberRef.current.value || '',
      memberCount: '',
      departDate: departDateRef.current.value || '',
      arrivalDate: arrivalDateRef.current.value || '',
      departPlace: departPlaceRef.current.value || '',
      arrivalPlace: arrivalPlaceRef.current.value || '',
      memo: '',
      stopPlace: '',
      wayType: '',
      payment: '',
      taxBill: false
    };
    formRef.current.reset();
    getData(estimation);
  };

  return (
    <section className={styles.estimate}>
      <p className={styles.estimateBox}>실시간 견적요청</p>
      <form ref={formRef} className={styles.data} onSubmit={onSubmit}>
        <li className={styles.travel}>
          <p>여행구분</p>
          <select ref={travelRef} onSelect={getData} name="travel">
            <option value="normal">일반여행</option>
            <option value="ceremonial">관혼상제</option>
            <option value="school">학교단체</option>
            <option value="etc">기타단체</option>
          </select>
        </li>
        <li className={styles.name}>
          <p>성명</p>
          <input ref={nameRef}type="text" placeholder='Name' />
        </li>
        <li className={styles.phone}>
          <p>핸드폰</p>
          <select ref={phoneRef}name="phone">
            <option value="010">010</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
            <option value="019">019</option>
          </select>
          <p className={styles.hyphen}>-</p>
          <input type="text" />
          <p className={styles.hyphen}>-</p>
          <input type="text" />
        </li>
        <li className={styles.password}>
          <p>확인용 비밀번호</p>
          <input ref={passwordRef}type="text" placeholder='Password' />
        </li>
        <li className={styles.email}>
          <p>이메일 주소</p>
          <input ref={emailRef}type="text" placeholder='E-mail' />
        </li>
        <li className={styles.departDate}>
          <p>출발일자</p>
          <input ref={departDateRef}type="date" name="depart-date" />
        </li>
        <li className={styles.arrivalDate}>
          <p>귀행일자</p>
          <input ref={arrivalDateRef}type="date" name="arrival-date" />
        </li>
        <li className={styles.departPlace}>
          <p>출발지</p>
          <select ref={departPlaceRef}name="depart-place">
            <option value="seoul">서울</option>
            <option value="gyeonggi">경기</option>
            <option value="gangwon">강원</option>
            <option value="gyeongbug">경북</option>
            <option value="gyeongnam">경남</option>
            <option value="jeonbug">전북</option>
            <option value="jeonnam">전남</option>
            <option value="jeju">제주</option>
            <option value="chungbuk">충북</option>
            <option value="chungnam">충남</option>
            <option value="gwangju">광주</option>
            <option value="daegu">대구</option>
            <option value="daejeon">대전</option>
            <option value="busan">부산</option>
            <option value="ulsan">울산</option>
            <option value="incheon">인천</option>
          </select>
          <input type="text" placeholder='depart place' />
        </li>
        <li className={styles.arrivalPlace}>
          <p>도착지</p>
          <select ref={arrivalPlaceRef}name="arrival place">
            <option value="seoul">서울</option>
            <option value="gyeonggi">경기</option>
            <option value="gangwon">강원</option>
            <option value="gyeongbug">경북</option>
            <option value="gyeongnam">경남</option>
            <option value="jeonbug">전북</option>
            <option value="jeonnam">전남</option>
            <option value="jeju">제주</option>
            <option value="chungbuk">충북</option>
            <option value="chungnam">충남</option>
            <option value="gwangju">광주</option>
            <option value="daegu">대구</option>
            <option value="daejeon">대전</option>
            <option value="busan">부산</option>
            <option value="ulsan">울산</option>
            <option value="incheon">인천</option>
          </select>
          <input type="text" placeholder='arrival place' />
        </li>
        <li className={styles.vehicle}>
          <p>차량구분</p>
          <select ref={vehicleRef}name="vehicle">
            <option value="small">25인승 소형</option>
            <option value="limousine">28인승 리무진</option>
            <option value="large">45인승 대형</option>
          </select>
        </li>
        <li className={styles.vehicleNumber}>
          <p>차량댓수</p>
          <select ref={vehicleNumberRef}name="vehicleNumber">
            <option value="1">1대</option>
            <option value="2">2대</option>
            <option value="3">3대</option>
            <option value="4">4대</option>
            <option value="5">5대</option>
            <option value="6">6대</option>
            <option value="7">7대</option>
            <option value="8">8대</option>
            <option value="9">9대</option>
            <option value="over10">10대 이상</option>
          </select>
        </li>
        <li className={styles.detailButton}><button>더보기</button></li>
        <button onSubmit={onSubmit}>견적요청</button>
      </form>
    </section>
  )
};

export default Estimate;