import React, { useEffect } from 'react';
import styles from './myEstimateList.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import MyEstimateListItem from '../myEstimateListItem/myEstimateListItem';
import PageButton from '../pageButton/pageButton';
import SubHeader from '../subHeader/subHeader';
import { useNavigate } from 'react-router-dom';

const MyEstimateList = ({ menu, myData, changeMenu, exit, requestDataList, getMyEstimateData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!myData) {
      navigate('/search');
    }
    changeMenu('나의견적확인');
  }, []);

  const allPageArray = (number) => {
    const array = [];
    for (let i = 0; i < number; i++) {
      array.push(i + 1)
    }
    return array
  };

  const onClick = () => {
    exit();
    navigate('/search');
  };

  return (
    <main className={styles.estimateList}>
      <Header />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader menu={menu} />
          <section>
            <div className={styles.dataList}>
              <span className={styles.id}>순번</span>
              <span className={styles.name}>등록자</span>
              <span className={styles.travelType}>여행구분</span>
              <span className={styles.departPlace}>출발지</span>
              <span className={styles.arrivalPlace}>도착지</span>
              <span className={styles.vehicleType}>차량구분</span>
              <span className={styles.createdDate}>요청일</span>
            </div>
            <ul>
              {requestDataList.map(data => (<MyEstimateListItem data={data} />))}
            </ul>
            <ul className={styles.pageList}>
              {allPageArray(1).map(number => (<PageButton page={number} getEstimateData={getMyEstimateData} />))}
            </ul>
            <button onClick={onClick}>나가기</button>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default MyEstimateList;