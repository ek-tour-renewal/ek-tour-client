import React, { useState } from 'react';
import styles from './slider.module.css';

const Slider = ({ imageList }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleSlide = (slideIndex) => {
    if (slideIndex === imageList.length - 1) {
      slideIndex = 0;
    } else if (slideIndex < 0) {
      slideIndex = imageList.length - 1;
    }
    setSlideIndex(slideIndex);
  };

  const handleSwipe = (direction) => {
    handleSlide(slideIndex + direction);
    console.log(slideIndex)
  };

  return (
    <section className={styles.slideContainer}>
      <button onClick={() => { handleSwipe(-1) }} className={styles.Button}>
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <ul className={styles.slideInner}>
        <img className={styles.slideImage} src={`${imageList[slideIndex].url}`} alt="bus interior image" />
      </ul>
      <button onClick={() => { handleSwipe(1) }} className={styles.Button}>
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </section>
  )
};

export default Slider;