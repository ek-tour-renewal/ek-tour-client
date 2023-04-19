import React from 'react';
import styles from './busType.module.css';
import Slider from './slider';

const busImages = [
  {url: './image/limousine/interior1.jpg'},
  {url: './image/limousine/interior2.jpg'},
  {url: './image/limousine/interior3.jpg'},
  {url: './image/limousine/interior4.jpg'},
  {url: './image/limousine/interior5.jpg'},
  {url: './image/limousine/interior6.jpg'},
  {url: './image/limousine/interior7.jpg'},
  {url: './image/limousine/interior8.jpg'},
  {url: './image/limousine/interior9.jpg'},
  {url: './image/limousine/interior10.jpg'},
  {url: './image/limousine/interior11.jpg'},
];

const Limousine = () => {
  return (
      <section className={styles.container}>
        <h1 className={styles.title}>28인승 리무진</h1>

        <section className={styles.container}>
          <p className={styles.busDetail}>
            최고급의 편의 시설과 안락한 시트, 각종 고급형 시설을 갖춘 리무진으로서 <br/>
            24인승 ~ 28인승의 단체 여행에 이용됩니다. 고급 골프모임, 동호회, 관공서, 기업체, <br/>
            일반인 모두 이용할 수 있으며 최고급형 대형 버스입니다.
          </p>

          <img src='/image/limousineExterior.jpg' alt='28인승 리무진 외관' width={'50%'}/>

          <h2 className={styles.imageTitle}>차량 사진</h2>

          <Slider imageList={busImages}/>
        </section>
      </section>
  )
};

export default Limousine;