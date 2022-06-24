import React, { memo } from 'react';
import styles from './footer.module.css';

const Footer = memo((props) => {
  return (
    <footer className={styles.footer}>
      <section className={styles.detail}>
        <h1 className={styles.title}>주식회사 이케이투어</h1>
        <ul>
          <li>대표 배승원 개인정보취급자명 조운</li>
          <li>사업자번호 324-87-00192</li>
          <li>법인등록번호 284911-0144524</li>
          <li>일반여행업등록법인 (국내여행/해외여행)</li>
        </ul>
        <li className={styles.siteAddress}>copyright. www.ekhanabus.com All Right Reserved.</li>
      </section>
      <section className={styles.detail}>
        <li>주소 서울 송파구 가락로 102, 르호봇 408호</li>
        <li>대표전화 02.3432.6545 팩스 02.6008.6545</li>
        <li className={styles.address}>버스대절/여행 문의 010-6387-6086 ektour0914@naver.com</li>
      </section>
    </footer>
  )
});

export default Footer;