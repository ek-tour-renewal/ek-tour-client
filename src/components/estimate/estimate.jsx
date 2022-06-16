import React from 'react';
import styles from './estimate.module.css';

const Estimate = (props) => {
  return (
    <section className={styles.estimate}>
      <p className={styles.estimateBox}>실시간 견적요청</p>
      <ul className={styles.data}>
        <li className={styles.travel}>
          <p>여행구분</p>
          <select name="travel">
            <option value="normal">일반여행</option>
            <option value="ceremonial">관혼상제</option>
            <option value="school">학교단체</option>
            <option value="etc">기타단체</option>
          </select>
        </li>
        <li className={styles.name}>
          <p>성명</p>
          <input type="text" placeholder='Name' />
        </li>
        <li className={styles.phone}>
          <p>핸드폰</p>
          <select name="phone">
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
          <input type="text" placeholder='Password' />
        </li>
        <li className={styles.email}>
          <p>이메일 주소</p>
          <input type="text" placeholder='E-mail' />
        </li>
        <li className={styles.departureDate}>
          <p>출발일자</p>
          <input type="date" name="departure-date" />
        </li>
        <li className={styles.returnDate}>
          <p>귀행일자</p>
          <input type="date" name="return-date" />
        </li>
        <li className={styles.departurePlace}>
          <p>출발지</p>
          <select name="departure-place">
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
          <input type="text" placeholder='departure place' />
        </li>
        <li className={styles.destination}>
          <p>도착지</p>
          <select name="destination">
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
          <input type="text" placeholder='destination' />
        </li>
        <li className={styles.vehicle}>
          <p>차량구분</p>
          <select name="vehicle">
            <option value="small">25인승 소형</option>
            <option value="limousine">28인승 리무진</option>
            <option value="large">45인승 대형</option>
          </select>
        </li>
        <li className={styles.vehicleNumber}>
          <p>차량댓수</p>
          <select name="vehicleNumber">
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
      </ul>
    </section>
  )
};

export default Estimate;