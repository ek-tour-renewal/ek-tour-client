import React, { useEffect } from 'react';
import styles from './estimateList.module.css';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import Footer from '../footer/footer';
import EstimateListItem from '../estimateListItem/estimateListItem';
import PageButton from '../pageButton/pageButton';


const EstimateList = ({ logoURL, menu, menus, changeMenu, getEstimateListPage, allPage, getEstimateList, requestDataList }) => {
  // side menu
  const menuList = [
    { url: '/list', menu: '견적요청목록' },
    { url: '/request', menu: '견적요청하기' },
    { url: '/search', menu: '나의견적확인' },
  ];

  useEffect(() => {
    changeMenu('견적요청목록', menuList);
    getEstimateListPage();
  }, []);

  // 페이지 리스트
  const allPageArray = (number) => {
    const array = [];
    for (let i = 0; i < number; i++) {
      array.push(i + 1)
    }
    return array;
  };

  return (
    <main className={styles.estimateList}>
      <Header logoURL={logoURL} />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu menus={menus} />
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
              <button className={styles.prevPageButton}>
                <i class="fa-solid fa-caret-left"></i>
              </button>
              {allPageArray(allPage).map(number => (<PageButton page={number} getEstimateList={getEstimateList} />))}
              <button className={styles.nextPageButton}>
                <i class="fa-solid fa-caret-right"></i>
              </button>
            </ul>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default EstimateList;