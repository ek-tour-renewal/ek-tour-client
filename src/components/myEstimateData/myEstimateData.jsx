import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myEstimateData.module.css';
import Header from '../header/header';
import SubHeader from '../subHeader/subHeader';
import Footer from '../footer/footer';

const MyEstimateData = ({ menu, myData, changeMenu, Ref, exit }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // if (!myData) {
    //   navigate('/search');
    // };
    changeMenu('나의견적확인');
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    // 정보 변경 (update)
  }

  const onDelete = (event) => {
    // 정보 삭제
  };

  // 나가기
  const onOut = () => {
    exit();
    navigate('/my');
  };

  return (
    <main>
      <Header />
      <section className={styles.myEstimateData}>
        <SubHeader menu={menu} />

        {/* 나의 견적 요청 정보 - 기존 정보 입력 필요 */}
        <form className={styles.container} ref={Ref.formRef} onSubmit={onSubmit}>
          <ul className={styles.personalData}>
            <ul className={styles.personalData1}>
              <li className={styles.name}>
                <p className={styles.nameTitle}>신청자명</p>
                <input ref={Ref.nameRef} type='text' />
              </li>
              <li className={styles.email}>
                <p className={styles.emailTitle}>이메일 주소</p>
                <input ref={Ref.emailRef} type='email' />
              </li>
            </ul>
            <ul className={styles.personalData2}>
              <li className={styles.phone}>
                <p className={styles.phoneTitle}>핸드폰</p>
                <select className={styles.selectPhone} ref={Ref.phoneFirstRef}>
                  <option value='010'>010</option>
                  <option value='016'>016</option>
                  <option value='017'>017</option>
                  <option value='018'>018</option>
                  <option value='019'>019</option>
                </select>
                <p className={styles.hyphen}>-</p>
                <input className={styles.phoneNumber} ref={Ref.phoneMiddleRef} type='text' maxLength={4} />
                <p className={styles.hyphen}>-</p>
                <input className={styles.phoneNumber} ref={Ref.phoneLastRef} type='text' maxLength={4} />
              </li>
              <li className={styles.password}>
                <p className={styles.passwordTitle}>비밀번호</p>
                <input ref={Ref.passwordRef} type='text' value={1234} maxLength={4} />
              </li>
            </ul>
          </ul>
          <ol>
            <li className={styles.detailEstimate}>비밀번호는 4자리 숫자로 입력해 주세요.</li>
            <li className={styles.detailEstimate}>핸드폰 번호와 비밀번호는 견적 내용 확인시 필요합니다.</li>
            <li className={styles.detailEstimate}>경유지가 있거나 기타 요구사항이 있으시면 정확한 견적을 위해 반드시 기입해 주시기 바랍니다.</li>
          </ol>
          <ul className={styles.detailData}>
            <li className={styles.travel}>
              <p className={styles.travelTitle}>여행구분</p>
              <select ref={Ref.travelRef}>
                <option value='일반여행'>일반여행</option>
                <option value='관혼상제'>관혼상제</option>
                <option value='학교단체'>학교단체</option>
                <option value='기타단체'>기타단체</option>
              </select>
            </li>
            <li className={styles.vehicle}>
              <p className={styles.vehicleTitle}>차량구분</p>
              <select ref={Ref.vehicleRef}>
                <option value='25인승 소형'>25인승 소형</option>
                <option value='28인승 리무진'>28인승 리무진</option>
                <option value='45인승 대형'>45인승 대형</option>
              </select>
            </li>
            <li className={styles.vehicleNumber}>
              <p className={styles.vehicleNumberTitle}>차량대수</p>
              <select ref={Ref.vehicleNumberRef}>
                <option value='1'>1대</option>
                <option value='2'>2대</option>
                <option value='3'>3대</option>
                <option value='4'>4대</option>
                <option value='5'>5대</option>
                <option value='6'>6대</option>
                <option value='7'>7대</option>
                <option value='8'>8대</option>
                <option value='9'>9대</option>
                <option value='10'>10대 이상</option>
              </select>
            </li>
            <li className={styles.memberCount}>
              <p className={styles.memberCountTitle}>인원</p>
              <input ref={Ref.memberCountRef} type='text' />
              명
            </li>
            <li className={styles.departDate}>
              <p className={styles.departDateTitle}>출발일자</p>
              <input ref={Ref.departDateRef} type='date' />
            </li>
            <li className={styles.arrivalDate}>
              <p className={styles.arrivalDateTitle}>귀행일자</p>
              <input ref={Ref.arrivalDateRef} type='date' />
            </li>
            <ul className={styles.departPlaceContainer}>
              <li className={styles.departPlace}>
                <p className={styles.departPlaceTitle}>출발지</p>
                <select ref={Ref.departPlaceRef}>
                  <option value='[서울]'>서울</option>
                  <option value='[경기]'>경기</option>
                  <option value='[강원]'>강원</option>
                  <option value='[경상]'>경북</option>
                  <option value='[경상]'>경남</option>
                  <option value='[전라]'>전북</option>
                  <option value='[전라]'>전남</option>
                  <option value='[제주]'>제주</option>
                  <option value='[충청]'>충북</option>
                  <option value='[충청]'>충남</option>
                  <option value='[광주]'>광주</option>
                  <option value='[대구]'>대구</option>
                  <option value='[대전]'>대전</option>
                  <option value='[부산]'>부산</option>
                  <option value='[울산]'>울산</option>
                  <option value='[인천]'>인천</option>
                </select>
              </li>
              <li className={styles.detailDepartPlace}>
                <p className={styles.detailDepartPlaceTitle}>세부정보</p>
                <input ref={Ref.departPlaceDetailRef} type='text' />
              </li>
            </ul>
            <ul className={styles.arrivalPlaceContainer}>
              <li className={styles.arrivalPlace}>
                <p className={styles.arrivalPlaceTitle}>도착지</p>
                <select ref={Ref.arrivalPlaceRef}>
                  <option value='[서울]'>서울</option>
                  <option value='[경기]'>경기</option>
                  <option value='[강원]'>강원</option>
                  <option value='[경상]'>경북</option>
                  <option value='[경상]'>경남</option>
                  <option value='[전라]'>전북</option>
                  <option value='[전라]'>전남</option>
                  <option value='[제주]'>제주</option>
                  <option value='[충청]'>충북</option>
                  <option value='[충청]'>충남</option>
                  <option value='[광주]'>광주</option>
                  <option value='[대구]'>대구</option>
                  <option value='[대전]'>대전</option>
                  <option value='[부산]'>부산</option>
                  <option value='[울산]'>울산</option>
                  <option value='[인천]'>인천</option>
                </select>
              </li>
              <li className={styles.detailArrivalPlace}>
                <p className={styles.detailArrivalPlaceTitle}>세부정보</p>
                <input ref={Ref.arrivalPlaceDetailRef} type='text' />
              </li>
            </ul>
            <li className={styles.stopPlace}>
              <p className={styles.stopPlaceTitle}>경유지</p>
              <input ref={Ref.stopPlaceRef} type='text' />
            </li>
            <li className={styles.wayType}>
              <p className={styles.wayTypeTitle}>왕복구분</p>
              <label>
                <input className={styles.checkbox} ref={Ref.aroundWayTypeRef} type="radio" name='wayType' />왕복
                <input className={styles.checkbox} type="radio" name='wayType' />편도
              </label>
            </li>
            <li className={styles.payment}>
              <p className={styles.paymentTitle}>결제방법</p>
              <input className={styles.checkbox} ref={Ref.cashRef} type='radio' name='payType' />현금
              <input className={styles.checkbox} type='radio' name='payType' />카드
            </li>
            <li className={styles.taxBill}>
              <p className={styles.taxBillTitle}>세금계산서 발급</p>
              <input className={styles.checkbox} ref={Ref.taxBillRef} type='radio' name='taxBillType' />발급
              <input className={styles.checkbox} type='radio' name='taxBillType' />발급안함
            </li>
            <li className={styles.memo}>
              <p className={styles.memoTitle}>기타 메모 사항</p>
              <textarea className={styles.memoTextarea} ref={Ref.memoRef}></textarea>
            </li>
          </ul>
          <ol>
            <li className={styles.detailEstimate}>견적내용은 문자 메시지로 발송됩니다. 핸드폰번호를 정확하게 입력하시기 바랍니다.</li>
            <li className={styles.detailEstimate}>이메일로 받고자 하실 경우에는 반드시 이메일 주소를 입력하시고 기타 메모사항에 [이메일 요청]이라고 기입해 주시기 바랍니다.</li>
            <li className={styles.detailEstimate}>경유지 또는 목적지 외 인근 지역 운행이 있으면 반드시 기재하여야 합니다.</li>
            <li className={styles.detailEstimate}>모든 견적은 부가세 별도입니다.</li>
          </ol>
          <button className={styles.button}>내용수정</button>
          <button className={styles.button} type='button' onClick={onDelete}>삭제</button>
          <button className={styles.button} type='button' onClick={onOut}>취소</button>
        </form>
      </section>
      <Footer />
    </main>
  )
};

export default MyEstimateData;