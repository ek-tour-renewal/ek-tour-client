import React, { memo } from 'react';
import styles from './main.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Estimate from '../estimate/estimate';

const Main = memo(({ Ref, getData }) => {
  return (
    <section className={styles.main}>
      {/* 네비게이션바 */}
      <Header />
      <img className={styles.mainImage} src='./image/main.jpg' alt='메인 이미지' />
      <main className={styles.body}>
        {/* 견적요청 폼 */}
        <Estimate Ref={Ref} getData={getData} />
        {/* 문의 */}
        <section className={styles.info}>
          {/* 연락처 */}
          <ul className={styles.contact}>
            <li className={styles.contactPhone}>
              <i className='fa-solid fa-phone fa-3x'></i>
              <h1 className={styles.phoneDetail}>
                버스대절/여행상담 문의 <br /> 010-6387-6086
              </h1>
            </li>
            <li className={styles.kakao}>
              <img src='/image/kakaotalk.png' alt='kakaotalk logo' height='35px' />
              <p className={styles.kakaoDetail}>카톡상담 seanpapa</p>
            </li>
            <li className={styles.email}>
              <i class='fa-solid fa-envelope fa-2x'></i>
              <p className={styles.emailDetail}>이메일 문의 ektour0917@naver.com</p>
            </li>
          </ul>
          {/* 고객센터 & 계좌 */}
          <ul className={styles.notice}>
            <ul className={styles.serviceCenter}>
              <li><h1 className={styles.serviceCenterTitle}>고객센터</h1></li>
              <li className={styles.serviceCenterNumber}>02.3432.6545</li>
              <li className={styles.serviceCenterTime}>상담가능시간 09시~18시</li>
              <li className={styles.serviceCenterDetail}>업무시간 이외에도 전화 주시면 친절히 상담해 드립니다.</li>
            </ul>
            <ul className={styles.account}>
              <li><h1 className={styles.accountTitle}>무통장입금안내</h1></li>
              <li><img src='/image/kbbank.png' alt='kb bank' className={styles.kbbankImg} height='35x' /></li>
              <li className={styles.accountNumber}>810137-04-006627</li>
              <li className={styles.accountDetail}>예금주 이케이투어</li>
            </ul>
          </ul>
        </section>
      </main>
      <Footer />
    </section>
  )
});

export default Main;