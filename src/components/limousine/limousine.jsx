import React, { useEffect } from 'react';
import styles from './limousine.module.css';
import SubHeader from '../subHeader/subHeader';
import Slider from '../slider/slider';

const Limousine = ({ menu, changeMenu, menus }) => {
  // side menu
  const menuList = [
    { url: '/notice', menu: '버스안내' },
    { url: '/smallbus', menu: '25인승 소형' },
    { url: '/limousine', menu: '28인승 리무진' },
    { url: '/bigbus', menu: '45인승 대형' }
  ];

  // bus images
  const ImageList = [
    { url: './image/limousine/interior1.jpg' },
    { url: './image/limousine/interior2.jpg' },
    { url: './image/limousine/interior3.jpg' },
    { url: './image/limousine/interior4.jpg' },
    { url: './image/limousine/interior5.jpg' },
    { url: './image/limousine/interior6.jpg' },
    { url: './image/limousine/interior7.jpg' },
    { url: './image/limousine/interior8.jpg' },
    { url: './image/limousine/interior9.jpg' },
    { url: './image/limousine/interior10.jpg' },
    { url: './image/limousine/interior11.jpg' },
  ];

  useEffect(() => {
    changeMenu('28인승 리무진', menuList);
  }, []);

  return (
    <main className={styles.limousine}>
      <SubHeader menu={menu} />
      <h1 className={styles.limousineTitle}>28인승 리무진</h1>
      <section className={styles.container}>
        <p className={styles.limousineDetail}>
          최고급의 편의 시설과 안락한 시트, 각종 고급형 시설을 갖춘 리무진으로서 <br />
          24인승 ~ 28인승의 단체 여행에 이용됩니다. 고급 골프모임, 동호회, 관공서, 기업체, <br />
          일반인 모두 이용할 수 있으며 최고급형 대형 버스입니다.
        </p>
        <img src='./image/limousineExterior.jpg' alt='28인승 리무진 외관' />
        <h2 className={styles.busImageTitle}>차량 사진</h2>
        <Slider imageList={ImageList} />
      </section>
    </main>
  )
};

export default Limousine;