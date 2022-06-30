import React, { useRef } from 'react';
import styles from './pageButton.module.css';

const PageButton = ({ page, getEstimateList }) => {
  const buttonRef = useRef();

  // 페이지 클릭 이벤트 - 수정필요(나의 견적 확인하기)
  const onPageClick = () => {
    getEstimateList(buttonRef.current.value - 1);
  }

  return (
    <button className={styles.button} ref={buttonRef} value={page} onClick={onPageClick}>
      {page}
    </button>
  )
};

export default PageButton;