import React, { useRef } from 'react';
import styles from './pageButton.module.css';

const PageButton = ({ page, getEstimateList }) => {
  const buttonRef = useRef();

  const onPageClick = () => {
    getEstimateList(buttonRef.current.value - 1);
  }

  return (
    <div>
      <button className={styles.prevPageButton}>
        <i class="fa-solid fa-caret-left"></i>
      </button>
      <button className={styles.button} ref={buttonRef} value={page} onClick={onPageClick}>
        {page}
      </button>
      <button className={styles.nextPageButton}>
        <i class="fa-solid fa-caret-right"></i>
      </button>
    </div>
  )
};

export default PageButton;