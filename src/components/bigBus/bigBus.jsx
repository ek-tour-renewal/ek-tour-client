import React, { useEffect } from 'react';
import styles from './bigBus.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import Slider from '../slider/slider';

const BigBus = ({ logoURL, menu, changeMenu, menus }) => {
  // side menu
  const menuList = [
    {url: '/notice', menu: '버스안내'}, 
    {url: '/smallbus', menu: '25인승 소형'}, 
    {url: '/limousine', menu: '28인승 리무진'}, 
    {url: '/bigbus', menu: '45인승 대형'}
  ];

  // bus images
  const ImageList = [
    { url: './image/bigBus/interior1.jpg' },
    { url: './image/bigBus/interior2.jpg' },
    { url: './image/bigBus/interior3.jpg' },
    { url: './image/bigBus/interior4.jpg' },
    { url: './image/bigBus/interior5.jpg' },
    { url: './image/bigBus/interior6.jpg' },
    { url: './image/bigBus/interior7.jpg' },
    { url: './image/bigBus/interior8.jpg' },
    { url: './image/bigBus/interior9.jpg' },
    { url: './image/bigBus/interior10.jpg' },
    { url: './image/bigBus/interior11.jpg' },
    { url: './image/bigBus/interior12.jpg' },
    { url: './image/bigBus/interior13.jpg' },
  ];

  useEffect(() => {
    changeMenu('45인승 대형', menuList);
  }, []);

  return (
    <main className={styles.bigBus}>
      <Header logoURL={logoURL} />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu menus={menus} />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader menu={menu} />
          <h1 className={styles.bigBusTitle}>45인승 대형</h1>
          <section className={styles.container}>
            <p className={styles.busDetail}>
              가장 일반적으로 많이 애용되는 전세버스입니다. <br />
              40~45인승의 단체 여행에 적합하고 기업체, 관공서, 동호회, 일반단체의 국내 버스여행에 <br />
              많이 이용되며 기업체와 관공서 출퇴근 차량, 대학생 MT, OT, 외국인 투어에도 많이 이용됩니다.
            </p>
            <img src='./image/bigBusExterior.jpg' alt='45인승 대형버스 외관' />
            <h2 className={styles.busImageTitle}>차량 사진</h2>
            <Slider imageList={ImageList}/>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default BigBus;