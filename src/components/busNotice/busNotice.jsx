import React, { useEffect } from 'react';
import styles from './busNotice.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';

const BusNotice = ({ menu, changeMenu }) => {
  useEffect(() => {
    changeMenu('버스안내');
  }, []);

  return (
    <main className={styles.busNotice}>
      <Header />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader menu={menu} />
          <h1 className={styles.vehicleNoticeTitle}>차량안내</h1>
          <ul>
            <div className={styles.subTitle}>
              <h2 className={styles.busExteriorTitle}>버스외관</h2>
              <h2 className={styles.personnelTitle}>제원 및 승차 인원</h2>
            </div>
            <li className={styles.smallBus}>
              <div>
                <img src='/image/smallBus.jpg' alt='소형버스' />
                <p>소형</p>
              </div>
              <p className={styles.busDetail}>
                용도 : 마을버스, 유치원, 관광용 <br />
                승차인원 : 15 / 16 / 18 / 23 / 24 <br />
                전장 : 7미터 <br />
                차량입차비 : 저렴함
              </p>
            </li>
            <li className={styles.limousine}>
              <div>
                <img src='/image/limousine.jpg' alt='중형 리무진' />
                <p>중형</p>
              </div>
              <p className={styles.busDetail}>
                용도 : 마을버스, 유치원, 관광용 <br />
                승차인원 : 30-35인 <br />
                전장 : 9미터 <br />
                승차감 : 중급 <br />
                차량임차비 : 보통
              </p>
            </li>
            <li className={styles.bigBus}>
              <div>
                <img src='/image/bigBus.jpg' alt='대형버스' />
                <p>대형</p>
              </div>
              <p className={styles.busDetail}>
                용도 : 관광버스 전용 <br />
                &nbsp; &nbsp; (대형일반, 우등 리무진) <br />
                승차인원 : 40-45인 (일반), <br />
                &nbsp; &nbsp; 24-28인 (우등 리무진) <br />
                전장 : 12미터 <br />
                승차감 : 상급, 최상급 <br />
                차량임차비 : 일반적, 비쌈
              </p>
            </li>
            <p className={styles.Precaution}>
              차량 탑승 가능 인원은 개별 버스의 내부 실내 좌속 및 인테리어에 따라 인원수가 다릅니다. <br />
              여행하시는 탑승 인원에 따라 원하시는 버스 유형을 참고하세요.
            </p>
          </ul>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default BusNotice;