import styles from './bus.module.css';
import Slider from './slider';

const busImages = [
  { url: './image/smallBus/interior1.jpg' },
  { url: './image/smallBus/interior2.jpg' },
  { url: './image/smallBus/interior3.jpg' },
  { url: './image/smallBus/interior4.jpg' },
  { url: './image/smallBus/interior5.jpg' },
  { url: './image/smallBus/interior6.jpg' },
];

const SmallBus = () => {
  return (
      <section className={styles.container}>
        <h1 className={styles.title}>25인승 소형</h1>

        <section>
          <p className={styles.busDetail}>
            각종 소규모 단체, 동호회, 교회, 학원, 유치원 등에서 많이 이용하고 있는 25인승 버스입니다. <br />
            장소에 구애받지 않고 이동과 기동성이 뛰어나고 비용이 저렴하여 <br />
            소규모 단체의 여행에 이용됩니다.
          </p>

          <img src='/image/smallBusExterior.jpg' alt='25인승 소형버스 외관' width={'60%'}/>

          <h2 className={styles.imageTitle}>차량 사진</h2>

          <Slider imageList={busImages} />
        </section>
      </section>
  )
};

export default SmallBus;