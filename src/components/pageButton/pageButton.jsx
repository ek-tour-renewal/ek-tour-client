import React, { useRef } from 'react';
import styles from './pageButton.module.css';

const PageButton = ({ page, getEstimateList }) => {
  const buttonRef = useRef();

  const onPageClick = () => {
    getEstimateList(buttonRef.current.value-1);
  }

  return (
    <button className={styles.button} ref={buttonRef} value={page} onClick={onPageClick}>
      {page}
    </button>
  )
};

export default PageButton;