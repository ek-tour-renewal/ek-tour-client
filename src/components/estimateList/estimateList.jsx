import React, { useEffect } from 'react';
import styles from './estimateList.module.css';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import Footer from '../footer/footer';
import EstimateListItem from '../estimateListItem/estimateListItem';
import PageButton from '../pageButton/pageButton';


const EstimateList = ({ menu, changeMenu, getEstimateListPage, allPage, requestDataList, getEstimateList }) => {

  useEffect(() => {
    changeMenu('견적요청목록');
    getEstimateListPage();
  }, []);

  const allPageArray = (number) => {
    const array = [];
    for (let i=0; i<number; i++) {
      array.push(i+1)
    }
    return array;
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
              {requestDataList.map(data => (<EstimateListItem data={data} />))}
            </ul>
            <ul className={styles.pageList}>
              {allPageArray(allPage).map(number => (<PageButton page={number} getEstimateList={getEstimateList} />))}
            </ul>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default EstimateList;