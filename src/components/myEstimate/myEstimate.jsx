import React, { useEffect, useRef } from 'react';
import styles from './myEstimate.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import { Navigate, useNavigate } from 'react-router-dom';

const MyEstimate = ({ menu, myData, changeMenu, getMyEstimateData }) => {
  const formRef = useRef();
  const phoneFirstRef = useRef();
  const phoneMiddleRef = useRef();
  const phoneLastRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    changeMenu('나의견적확인');
    console.log(menu);
  }, []);

  const checkMyEstimate = event => {
    event.preventDefault();
    const data = {
      phone: phoneFirstRef.current.value + phoneMiddleRef.current.value + phoneLastRef.current.value,
      password: passwordRef.current.value,
    };
    getMyEstimateData(data);
    navigate('/search/my');
    formRef.current.reset();
  }

  return (
    <main className={styles.myEstimate}>
      <Header />
      <main className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader menu={menu} />
          <form className={styles.form} ref={formRef} onSubmit={checkMyEstimate}>
            <li className={styles.phone}>
              <p>핸드폰</p>
              <select className={styles.phoneSelect} ref={phoneFirstRef} name="phone">
                <option value="010">010</option>
                <option value="016">016</option>
                <option value="017">017</option>
                <option value="018">018</option>
                <option value="019">019</option>
              </select>
              <p className={styles.hyphen}>-</p>
              <input className={styles.phoneInput} ref={phoneMiddleRef} type='text' maxlength='4' />
              <p className={styles.hyphen}>-</p>
              <input className={styles.phoneInput} ref={phoneLastRef} type='text' maxlength='4' />
            </li>
            <li className={styles.password}>
              <p>비밀번호</p>
              <input ref={passwordRef} className={styles.passwordInput} type='text' maxlength='4' placeholder='Password' />
            </li>
            <button className={styles.checkButton}>확인</button>
          </form>
          <p className={styles.explanation}>견적확인은 등록 시 입력한 핸드폰번호와 비밀번호로 확인합니다.</p>
        </section>
      </main>
      <Footer />
    </main>
  )
};

export default MyEstimate;