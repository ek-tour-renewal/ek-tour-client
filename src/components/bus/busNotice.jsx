import styles from './busNotice.module.css';

const BusNotice = () => {
  return (
    <section className={styles.busNotice}>
        <h1 className={styles.vehicleNoticeTitle}>버스 안내</h1>

        <ul>
          <li className={styles.information}>
            <p>
              차량 탑승 가능 인원은 개별 버스의 내부 실내 좌석 및 인테리어에 따라 인원수가 다릅니다. <br/>
              여행하시는 탑승 인원에 따라 원하시는 버스 유형을 참고하세요.
            </p>
          </li>

          <li className={`${styles.bus} ${styles.smallBus}`}>
            <div>
              <img src='/image/smallBus.jpg' alt='소형버스' width={'80%'}/>
              <p className={styles.busStyle}>소형</p>
            </div>

            <p className={styles.detail}>
              용도 : 마을버스, 유치원, 관광용 <br/>
              승차인원 : 15 / 16 / 18 / 23 / 24 <br/>
              전장 : 7미터 <br/>
              차량입차비 : 저렴함
            </p>
          </li>

          <li className={`${styles.bus} ${styles.limousine}`}>
            <div>
              <img src='/image/limousine.jpg' alt='중형 리무진' width={'80%'}/>
              <p className={styles.busStyle}>중형</p>
            </div>

            <p className={styles.detail}>
              용도 : 마을버스, 유치원, 관광용 <br/>
              승차인원 : 30-35인 <br/>
              전장 : 9미터 <br/>
              승차감 : 중급 <br/>
              차량임차비 : 보통
            </p>
          </li>

          <li className={`${styles.bus} ${styles.bigBus}`}>
            <div>
              <img src='/image/bigBus.jpg' alt='대형버스' width={'80%'}/>
              <p className={styles.busStyle}>대형</p>
            </div>

            <p className={styles.detail}>
              용도 : 관광버스 전용 (대형일반, 우등 리무진) <br/>
              승차인원 : 40-45인 (일반), 24-28인 (우등 리무진) <br/>
              전장 : 12미터 <br/>
              승차감 : 상급, 최상급 <br/>
              차량임차비 : 일반적, 비쌈
            </p>
          </li>
        </ul>
    </section>
  )
};

export default BusNotice;