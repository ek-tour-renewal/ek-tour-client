import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myEstimate.module.css';

export default function MyEstimateV1(props) {

  const navigate = useNavigate();

  // 나의 견적 확인 (내 정보 입력)
  const onSubmit = event => {
    props.checkMyEstimate(event);
    props.handleCloseMyEstimate(false);
    navigate('/my/list');
  };

  return (
    <Dialog open={props.open} onClose={props.handleCloseMyEstimate}>
      <DialogTitle>
        내 견적 요청 확인하기
      </DialogTitle>
      <DialogContent>
      <form className={styles.form} ref={props.myRef.formRef} onSubmit={onSubmit}>
        <li className={styles.phone}>
          <p>핸드폰</p>
          <select className={styles.phoneSelect} ref={props.myRef.phoneFirstRef}>
            <option value='010'>010</option>
            <option value='016'>016</option>
            <option value='017'>017</option>
            <option value='018'>018</option>
            <option value='019'>019</option>
          </select>
          <p className={styles.hyphen}>-</p>
          <input className={styles.phoneInput} ref={props.myRef.phoneMiddleRef} 
            type='text' maxLength='4' />
          <p className={styles.hyphen}>-</p>
          <input className={styles.phoneInput} ref={props.myRef.phoneLastRef} 
            type='text' maxLength='4' />
        </li>
        <li className={styles.password}>
          <p>비밀번호</p>
          <input className={styles.passwordInput} ref={props.myRef.passwordRef} 
            type='text' maxLength='4' />
        </li>
        <Box>
          <button className={styles.checkButton} type='submit'>확인</button>
          <button className={styles.checkButton} onClick={props.handleCloseMyEstimate}>취소</button>
        </Box>
      </form>
      <p className={styles.explanation}>견적 확인은 등록 시 입력한 핸드폰번호와 비밀번호로 확인합니다.</p>
      </DialogContent>
    </Dialog>
  );
};