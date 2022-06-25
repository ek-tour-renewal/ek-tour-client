import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myEstimate.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';

const MyEstimate = ({ logoURL, menu, myRef, changeMenu, checkMyEstimate, myData }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    changeMenu('나의견적확인');
    console.log(myData)
  }, []);

  const onSubmit = event => {
    checkMyEstimate(event);
    navigate('/search/my');
  };

  return (
    <main className={styles.myEstimate}>
      <Header logoURL={logoURL} />
      <main className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader menu={menu} />
          <form className={styles.form} ref={myRef.formRef} onSubmit={onSubmit}>
            <li className={styles.phone}>
              <p>핸드폰</p>
              <select className={styles.phoneSelect} ref={myRef.phoneFirstRef}>
                <option value='010'>010</option>
                <option value='016'>016</option>
                <option value='017'>017</option>
                <option value='018'>018</option>
                <option value='019'>019</option>
              </select>
              <p className={styles.hyphen}>-</p>
              <input className={styles.phoneInput} ref={myRef.phoneMiddleRef} type='text' maxlength='4' />
              <p className={styles.hyphen}>-</p>
              <input className={styles.phoneInput} ref={myRef.phoneLastRef} type='text' maxlength='4' />
            </li>
            <li className={styles.password}>
              <p>비밀번호</p>
              <input className={styles.passwordInput} ref={myRef.passwordRef} type='text' maxlength='4' />
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