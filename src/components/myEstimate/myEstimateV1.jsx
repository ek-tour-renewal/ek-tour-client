import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myEstimate.module.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

// props 정보
// open : Dialog의 open 여부를 결정할 state
// onClose : Dialog를 close할 function
// estimateId : 확인할 견적의 ID
// userName : 확인할 견적의 등록자명
// ektour : 통신 처리할 ektour Class
export default function MyEstimate(props, { ektour }) {

  const navigate = useNavigate();

  const [myInfo, setMyInfo] = useState({
    firstNum: '010',
    middleNum: '',
    lastNum: '',
    password: ''
  });

  const handleValueChange = (e) => {
    const {name, value} = e.target;
    setMyInfo({
      ...myInfo,
      [name]: value
    });
  }

  // 나의 견적 확인 (내 정보 입력)
  const onSubmit = (e) => {
    e.preventDefault();
    var form = {phone: myInfo.firstNum + myInfo.middleNum + myInfo.lastNum, password: myInfo.password};
    navigate('/estimate/my/list/1', {
      state: {
        phone: form.phone,
        password: form.password
      }
    });
    if (props.estimateId) {
      axios.post('/estimate/' + props.estimateId, form)
      .then((response) => {
        navigate('', {
          
        });
      })
      .catch((error) => { console.log(error); });
    } else {
      axios.post('/estimate/search/my', form)
      .then((response) => {
        if (!response.data) {
          console.log('정보 틀림');
        }
        props.onClose();
        
      })
      .catch((error) => { console.log(error); });
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        <Stack direction='row'>
          <Typography variant='h5' sx={{width: '100%', paddingTop: '6px'}}>
            {props.userName ? props.userName + '님의 견적 요청 확인하기' : '내 견적 요청 내역 확인하기'}
          </Typography>
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
      <form className={styles.form} onSubmit={onSubmit}>
        <li className={styles.phone}>
          <p>핸드폰</p>
          <select className={styles.phoneSelect} onChange={handleValueChange} name="firstNum">
            <option value='010'>010</option>
            <option value='016'>016</option>
            <option value='017'>017</option>
            <option value='018'>018</option>
            <option value='019'>019</option>
          </select>
          <p className={styles.hyphen}>-</p>
          <input className={styles.phoneInput} onChange={handleValueChange} name="middleNum" 
            type='tel' maxLength='4' />
          <p className={styles.hyphen}>-</p>
          <input className={styles.phoneInput} onChange={handleValueChange} name="lastNum" 
            type='tel' maxLength='4' />
        </li>
        <li className={styles.password}>
          <p>비밀번호</p>
          <input className={styles.passwordInput} onChange={handleValueChange} name="password"
            type='text' maxLength='4' />
        </li>
        <Stack direction='row' spacing={0.5}>
          <button className={styles.checkButton} type='submit'>확인</button>
          <button className={styles.checkButton} type='button' onClick={props.onClose}>취소</button>
        </Stack>
      </form>
      <p className={styles.explanation}>견적 확인은 등록 시 입력한 핸드폰번호와 비밀번호로 확인합니다.</p>
      </DialogContent>
    </Dialog>
  );
};