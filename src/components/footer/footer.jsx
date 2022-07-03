import React from 'react';
import styles from './footer.module.css';

const Footer = (props) => {
    return (
    <footer className={styles.footer}>
      <section className={styles.detail}>
        <h1 className={styles.title}>주식회사 이케이투어</h1>
        <ul>
          <li>대표 {props.companyData.adminName} 개인정보취급자명 {props.companyData.infoHandlerName}</li>
          <li>사업자번호 {props.companyData.businessNum}</li>
          <li>법인등록번호 {props.companyData.registrationNum}</li>
          <li>일반여행업등록법인 (국내여행/해외여행)</li>
        </ul>
        <li className={styles.siteAddress}>copyright. www.ekhanabus.co.kr All Right Reserved.</li>
      </section>
      <section className={styles.detail}>
        <li>주소 {props.companyData.address}</li>
        <li>대표전화 {props.companyData.tel} 팩스 {props.companyData.fax}</li>
        <li className={styles.address}>버스대절/여행 문의 {props.companyData.phone} {props.companyData.email}</li>
      </section>
    </footer>
  )
};

export default Footer;