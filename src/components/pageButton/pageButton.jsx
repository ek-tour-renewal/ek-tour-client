import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './pageButton.module.css';

const PageButton = ({ page, changePage }) => {

  const navigate = useNavigate();

  const onPageClick = (e) => {
    changePage(e.target.value);
    navigate('/estimate/list/' + e.target.value);
  }

  return (
    <button className={styles.button} value={page} onClick={onPageClick}>
      {page}
    </button>
  )
};

export default PageButton;