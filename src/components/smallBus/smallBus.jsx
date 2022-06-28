import React, { useEffect } from 'react';
import styles from './smallBus.module.css';
import SubHeader from '../subHeader/subHeader';
import Slider from '../slider/slider';

const SmallBus = ({ menu, changeMenu, menus }) => {
  // side menu
  const menuList = [
    { url: '/notice', menu: '버스안내' },
    { url: '/smallbus', menu: '25인승 소형' },
    { url: '/limousine', menu: '28인승 리무진' },
    { url: '/bigbus', menu: '45인승 대형' }
  ];

  //bus images
  const ImageList = [
    { url: './image/smallBus/interior1.jpg' },
    { url: './image/smallBus/interior2.jpg' },
    { url: './image/smallBus/interior3.jpg' },
    { url: './image/smallBus/interior4.jpg' },
    { url: './image/smallBus/interior5.jpg' },
    { url: './image/smallBus/interior6.jpg' },
  ];

  useEffect(() => {
    changeMenu('25인승 소형', menuList);
  }, []);

  return (
    <main className={styles.smallBus}>
      <SubHeader menu={menu} />
      <h1 className={styles.smallBusTitle}>25인승 소형</h1>
      <section className={styles.container}>
        <p className={styles.busDetail}>
          각종 소규모 단체, 동호회, 교회, 학원, 유치원 등에서 많이 이용하고 있는 25인승 버스입니다. <br />
          장소에 구애받지 않고 이동과 기동성이 뛰어나고 비용이 저렴하여 <br />
          소규모 단체의 여행에 이용됩니다.
        </p>
        <div>
          <img src='./image/smallBusExterior.jpg' width='600px' alt='25인승 소형버스 외관' />
          <p className={styles.busPersonnelDetail}>* 운전기사 1인 + 최대 24명 탑승 가능</p>
        </div>
        <h2 className={styles.busImageTitle}>차량 사진</h2>
        <Slider imageList={ImageList} />
      </section>
    </main>
  )
};

export default SmallBus;