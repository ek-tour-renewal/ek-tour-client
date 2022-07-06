import React, { useState } from 'react';
import styles from './myEstimate.module.css';
import MyEstimateList from '../myEstimateList/myEstimateList';

const MyEstimate = (props) => {

  const [myForm, setMyForm] = useState({
    firstNum: '010', middleNum: null, lastNum: null
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setMyForm({
      ...myForm,
      [name]: value
    });
  }

  const onSubmit = event => {
    event.preventDefault();

  };

  return (
    <section className={styles.myEstimate}>
      {!props.myData &&
        <main className={styles.main}>
          {/* 정보 입력란 */}
          <form className={styles.form} onSubmit={onSubmit}>
            <li className={styles.phone}>
              <p>핸드폰</p>
              <select className={styles.phoneSelect} name='firstNum'
                onChange={handleValueChange}>
                <option value='010'>010</option>
                <option value='016'>016</option>
                <option value='017'>017</option>
                <option value='018'>018</option>
                <option value='019'>019</option>
              </select>
              <p className={styles.hyphen}>-</p>
              <input className={styles.phoneInput} name='middleNum'
                onChange={handleValueChange}
                type='text' maxLength='4' />
              <p className={styles.hyphen}>-</p>
              <input className={styles.phoneInput} name='lastNum'
                onChange={handleValueChange}
                type='text' maxLength='4' />
            </li>
            <li className={styles.password}>
              <p>비밀번호</p>
              <input className={styles.passwordInput} name='password'
                onChange={handleValueChange}
                type='text' maxLength='4' />
            </li>
            <button className={styles.checkButton} type='submit'>확인</button>
          </form>
          <p className={styles.explanation}>
            견적확인은 등록 시 입력한 핸드폰번호와 비밀번호로 확인합니다.
          </p>
        </main>}
      {props.myData &&
        <MyEstimateList
          menu={props.menu}
          myData={props.myData}
          changeMenu={props.changeMenu}
          getEstimateListPage={props.getEstimateListPage}
          postMyEstimateData={props.postMyEstimateData}
          allPage={props.allPage}
          requestDataList={props.requestDataList}
          exit={props.exit}
          currentMyData={props.currentMyData} />
      }
    </section>
  )
};

export default MyEstimate;