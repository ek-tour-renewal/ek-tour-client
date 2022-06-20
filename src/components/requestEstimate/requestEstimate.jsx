import React, { useRef, useEffect } from 'react';
import styles from './requestEstimate.module.css';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import Footer from '../footer/footer';

const RequestEstimate = ({ menu, changeMenu, submitData }) => {
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

  useEffect(() => {
    changeMenu('견적요청하기');
  }, []);

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
      arrivalPlace: `${arrivalPlaceRef.current.value} ${arrivalPlaceDetailRef.current.value}`,
      memo: memoRef.current.value?memoRef.current.value:null,
      stopPlace: stopPlaceRef.current.value,
      wayType: aroundWayTypeRef.current.checked?'aroundWay':'oneWay',
      payment:  cashRef.current.checked?'cash':'card',
      taxBill: taxBillRef.current.checked,
    };

    submitData(estimation);
    formRef.current.reset();
  };

  return (
    <main className={styles.requestEstimate}>
      <Header />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader menu={menu} />
          <form ref={formRef} className={styles.container} onSubmit={getData}>
            <ul className={styles.personalData}>
              <ul className={styles.personalData1}>
                <li className={styles.name}>
                  <p className={styles.nameTitle}>신청자명</p>
                  <input ref={nameRef} type="text" placeholder='Name' />
                </li>
                <li className={styles.email}>
                  <p className={styles.emailTitle}>이메일 주소</p>
                  <input ref={emailRef} type="text" placeholder='E-mail' />
                </li>
              </ul>
              <ul className={styles.personalData2}>
                <li className={styles.phone}>
                  <p className={styles.phoneTitle}>핸드폰</p>
                  <select ref={phoneFirstRef} className={styles.selectPhone} name="phone">
                    <option value="010">010</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                  <p className={styles.hyphen}>-</p>
                  <input ref={phoneMiddleRef} className={styles.phoneNumber} type="text" />
                  <p className={styles.hyphen}>-</p>
                  <input ref={phoneLastRef} className={styles.phoneNumber} type="text" />
                </li>
                <li className={styles.password}>
                  <p className={styles.passwordTitle}>비밀번호</p>
                  <input ref={passwordRef} type="text" placeholder='Password' />
                </li>
              </ul>
            </ul>
            <ol>
              <li className={styles.detailEstimate}>핸드폰 번호와 비밀번호는 견적 내용 확인시 필요합니다.</li>
              <li className={styles.detailEstimate}>경유지가 있거나 기타 요구사항이 있으시면 정확한 견적을 위해 반드시 기입해 주시기 바랍니다.</li>
            </ol>
            <ul className={styles.detailData}>
              <li className={styles.travel}>
                <p className={styles.travelTitle}>여행구분</p>
                <select ref={travelRef} name="travel">
                  <option value="normal">일반여행</option>
                  <option value="ceremonial">관혼상제</option>
                  <option value="school">학교단체</option>
                  <option value="etc">기타단체</option>
                </select>
              </li>
              <li className={styles.vehicle}>
                <p className={styles.vehicleTitle}>차량구분</p>
                <select ref={vehicleRef} name="vehicle">
                  <option value="small">25인승 소형</option>
                  <option value="limousine">28인승 리무진</option>
                  <option value="large">45인승 대형</option>
                </select>
              </li>
              <li className={styles.vehicleNumber}>
                <p className={styles.vehicleNumberTitle}>차량대수</p>
                <select ref={vehicleNumberRef} name="vehicleNumber">
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
              <li className={styles.memberCount}>
                <p className={styles.memberCountTitle}>인원</p>
                <input ref={memberCountRef} type="text" />
                명
              </li>
              <li className={styles.departDate}>
                <p className={styles.departDateTitle}>출발일자</p>
                <input ref={departDateRef} type="date" name="depart-date" />
              </li>
              <li className={styles.arrivalDate}>
                <p className={styles.arrivalDateTitle}>귀행일자</p>
                <input ref={arrivalDateRef} type="date" name="arrival-date" />
              </li>
              <ul className={styles.departPlaceContainer}>
                <li className={styles.departPlace}>
                  <p className={styles.departPlaceTitle}>출발지</p>
                  <select ref={departPlaceRef} name="depart-place">
                    <option value="서울특별시">서울</option>
                    <option value="경기도">경기</option>
                    <option value="강원도">강원</option>
                    <option value="경상북도">경북</option>
                    <option value="경상남도">경남</option>
                    <option value="전라북도">전북</option>
                    <option value="전라남도">전남</option>
                    <option value="제주특별자치도">제주</option>
                    <option value="충청북도">충북</option>
                    <option value="충청남도">충남</option>
                    <option value="광주광역시">광주</option>
                    <option value="대구광역시">대구</option>
                    <option value="대전광역시">대전</option>
                    <option value="부산광역시">부산</option>
                    <option value="울산광역시">울산</option>
                    <option value="인천광역시">인천</option>
                  </select>
                </li>
                <li className={styles.detailDepartPlace}>
                  <p className={styles.detailDepartPlaceTitle}>세부정보</p>
                  <input ref={departPlaceDetailRef} type="text" placeholder='depart place' />
                </li>
              </ul>
              <ul className={styles.arrivalPlaceContainer}>
                <li className={styles.arrivalPlace}>
                  <p className={styles.arrivalPlaceTitle}>도착지</p>
                  <select ref={arrivalPlaceRef} name="arrival place">
                  <option value="서울특별시">서울</option>
                    <option value="경기도">경기</option>
                    <option value="강원도">강원</option>
                    <option value="경상북도">경북</option>
                    <option value="경상남도">경남</option>
                    <option value="전라북도">전북</option>
                    <option value="전라남도">전남</option>
                    <option value="제주특별자치도">제주</option>
                    <option value="충청북도">충북</option>
                    <option value="충청남도">충남</option>
                    <option value="광주광역시">광주</option>
                    <option value="대구광역시">대구</option>
                    <option value="대전광역시">대전</option>
                    <option value="부산광역시">부산</option>
                    <option value="울산광역시">울산</option>
                    <option value="인천광역시">인천</option>
                  </select>
                </li>
                <li className={styles.detailArrivalPlace}>
                  <p className={styles.detailArrivalPlaceTitle}>세부정보</p>
                  <input ref={arrivalPlaceDetailRef} type="text" placeholder='arrival place' />
                </li>
              </ul>
              <li className={styles.stopPlace}>
                <p className={styles.stopPlaceTitle}>경유지</p>
                <input ref={stopPlaceRef} type="text" placeholder='Location' />
              </li>
              <li className={styles.wayType}>
                <p className={styles.wayTypeTitle}>왕복구분</p>
                <input className={styles.checkbox} ref={aroundWayTypeRef} type="checkbox" value="aroundWay" />왕복
                <input className={styles.checkbox} type="checkbox" value="oneWay" />편도
              </li>
              <li className={styles.payment}>
                <p className={styles.paymentTitle}>결제방법</p>
                <input className={styles.checkbox} ref={cashRef} type="checkbox" name="현금" />현금
                <input className={styles.checkbox} type="checkbox" name="카드" />카드
              </li>
              <li className={styles.taxBill}>
                <p className={styles.taxBillTitle}>세금계산서 발급</p>
                <input className={styles.checkbox} ref={taxBillRef} type="checkbox" name="발급" />발급
                <input className={styles.checkbox} type="checkbox" name="발급안함" />발급안함
              </li>
              <li className={styles.memo}>
                <p className={styles.memoTitle}>기타 메모 사항</p>
                <textarea ref={memoRef} className={styles.memoTextarea} name="Other inquiries.." cols="30" rows="10"></textarea>
              </li>
            </ul>
            <ol>
              <li className={styles.detailEstimate}>견적내용은 문자 메시지로 발송됩니다. 핸드폰번호를 정확하게 입력하시기 바랍니다.</li>
              <li className={styles.detailEstimate}>이메일로 받고자 하실 경우에는 반드시 이메일 주소를 입력하시고 기타 메모사항에 [이메일 요청]이라고 기입해 주시기 바랍니다.</li>
              <li className={styles.detailEstimate}>경유지 또는 목적지 외 인근 지역 운행이 있으면 반드시 기재하여야 합니다.</li>
              <li className={styles.detailEstimate}>모든 견적은 부가세 별도입니다.</li>
            </ol>
            <button className={styles.buttonEstimate}>견적요청</button>
          </form>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default RequestEstimate;