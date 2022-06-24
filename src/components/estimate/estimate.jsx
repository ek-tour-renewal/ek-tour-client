import React from 'react';
import styles from './estimate.module.css';

const Estimate = ({ Ref, getData }) => {

  const onSubmit = (event) => {
    getData(event);
  }

  return (
    <section className={styles.estimate}>
      <p className={styles.estimateBox}>실시간 견적요청</p>
      <form ref={Ref.formRef} className={styles.data} onSubmit={onSubmit}>
        <section className={styles.estimate_1}>
          <li className={styles.travel}>
            <p>여행구분</p>
            <select className={styles.travelSelect} ref={Ref.travelRef} name="travel">
              <option value="일반여행">일반여행</option>
              <option value="관혼상제">관혼상제</option>
              <option value="학교단체">학교단체</option>
              <option value="기타단체">기타단체</option>
            </select>
          </li>
          <li className={styles.name}>
            <p>성명</p>
            <input ref={Ref.nameRef} className={styles.nameInput} type="text" />
          </li>
          <li className={styles.phone}>
            <p>핸드폰</p>
            <select className={styles.phoneSelect} ref={Ref.phoneFirstRef} name="phone">
              <option value="010">010</option>
              <option value="016">016</option>
              <option value="017">017</option>
              <option value="018">018</option>
              <option value="019">019</option>
            </select>
            <p className={styles.hyphen}>-</p>
            <input className={styles.phoneInput} ref={Ref.phoneMiddleRef} type="text" />
            <p className={styles.hyphen}>-</p>
            <input className={styles.phoneInput} ref={Ref.phoneLastRef} type="text" />
          </li>
          <li className={styles.password}>
            <p>확인용 비밀번호</p>
            <input ref={Ref.passwordRef} className={styles.passwordInput} type="text" placeholder='Password' />
          </li>
          <li className={styles.email}>
            <p>이메일 주소</p>
            <input ref={Ref.emailRef} type="text" placeholder='E-mail' />
          </li>
          <li className={styles.departDate}>
            <p>출발일자</p>
            <input className={styles.departDateInput} ref={Ref.departDateRef} type="date" name="depart-date" />
          </li>
          <li className={styles.arrivalDate}>
            <p>귀행일자</p>
            <input className={styles.arrivalDateInput} ref={Ref.arrivalDateRef} type="date" name="arrival-date" />
          </li>
          <li className={styles.departPlace}>
            <p>출발지</p>
            <select className={styles.placeSelect} ref={Ref.departPlaceRef} name="depart-place">
              <option value="[서울]">서울</option>
              <option value="[경기]">경기</option>
              <option value="[강원]">강원</option>
              <option value="[경상]">경북</option>
              <option value="[경상]">경남</option>
              <option value="[전라]">전북</option>
              <option value="[전라]">전남</option>
              <option value="[제주]">제주</option>
              <option value="[충청]">충북</option>
              <option value="[충청]">충남</option>
              <option value="[광주]">광주</option>
              <option value="[대구]">대구</option>
              <option value="[대전]">대전</option>
              <option value="[부산]">부산</option>
              <option value="[울산]">울산</option>
              <option value="[인천]">인천</option>
            </select>
            <input className={styles.placeInput} ref={Ref.departPlaceDetailRef} type="text" placeholder='depart place' />
          </li>
          <li className={styles.arrivalPlace}>
            <p>도착지</p>
            <select className={styles.placeSelect} ref={Ref.arrivalPlaceRef} name="arrival place">
              <option value="[서울]">서울</option>
              <option value="[경기]">경기</option>
              <option value="[강원]">강원</option>
              <option value="[경상]">경북</option>
              <option value="[경상]">경남</option>
              <option value="[전라]">전북</option>
              <option value="[전라]">전남</option>
              <option value="[제주]">제주</option>
              <option value="[충청]">충북</option>
              <option value="[충청]">충남</option>
              <option value="[광주]">광주</option>
              <option value="[대구]">대구</option>
              <option value="[대전]">대전</option>
              <option value="[부산]">부산</option>
              <option value="[울산]">울산</option>
              <option value="[인천]">인천</option>
            </select>
            <input className={styles.placeInput} ref={Ref.arrivalPlaceDetailRef} type="text" placeholder='arrival place' />
          </li>
          <li className={styles.stopPlace}>
            <p className={styles.stopPlaceTitle}>경유지</p>
            <input className={styles.placeInput} ref={Ref.stopPlaceRef} type="text" placeholder='Location' />
          </li>
        </section>
        <section className={styles.estimate_2}>
          <li className={styles.vehicle}>
            <p>차량구분</p>
            <select className={styles.vehicleSelect} ref={Ref.vehicleRef} name="vehicle">
              <option value="25인승 소형">25인승 소형</option>
              <option value="28인승 리무진">28인승 리무진</option>
              <option value="45인승 대형">45인승 대형</option>
            </select>
          </li>
          <li className={styles.vehicleNumber}>
            <p>차량대수</p>
            <select className={styles.vehicleSelect} ref={Ref.vehicleNumberRef} name="vehicleNumber">
              <option value="1">1대</option>
              <option value="2">2대</option>
              <option value="3">3대</option>
              <option value="4">4대</option>
              <option value="5">5대</option>
              <option value="6">6대</option>
              <option value="7">7대</option>
              <option value="8">8대</option>
              <option value="9">9대</option>
              <option value="10">10대 이상</option>
            </select>
          </li>
          <li className={styles.memberCount}>
            <p className={styles.memberCountTitle}>인원</p>
            <input className={styles.memberCountInput} ref={Ref.memberCountRef} type="text" />
            명
          </li>
          <li className={styles.wayType}>
            <p className={styles.wayTypeTitle}>왕복구분</p>
            <input className={styles.checkbox} ref={Ref.aroundWayTypeRef} type="checkbox" value="aroundWay" />왕복
            <input className={styles.checkbox} type="checkbox" value="편도" />편도
          </li>
          <li className={styles.payment}>
            <p className={styles.paymentTitle}>결제방법</p>
            <input className={styles.checkbox} ref={Ref.cashRef} type="checkbox" name="현금" />현금
            <input className={styles.checkbox} type="checkbox" name="카드" />카드
          </li>
          <li className={styles.taxBill}>
            <p className={styles.taxBillTitle}>세금계산서 발급</p>
            <input className={styles.checkbox} ref={Ref.taxBillRef} type="checkbox" name="발급" />발급
            <input className={styles.checkbox} type="checkbox" name="발급안함" />발급안함
          </li>
          <li className={styles.memo}>
            <p className={styles.memoTitle}>기타 메모 사항</p>
            <textarea className={styles.memoTextarea} ref={Ref.memoRef} name="Other inquiries.." cols="30" rows="10"></textarea>
          </li>
          {/* 견적요청 버튼 */}
          <li className={styles.requestButtonContainer}>
            <button type='submit' className={styles.requestButton}>견적요청</button>
          </li>
        </section>
      </form>
    </section>
  )
};

export default Estimate;