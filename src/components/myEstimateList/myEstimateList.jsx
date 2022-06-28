import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myEstimateList.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import MyEstimateListItem from '../myEstimateListItem/myEstimateListItem';
import SubHeader from '../subHeader/subHeader';
import PageButton from '../pageButton/pageButton';

const MyEstimateList = ({ logoURL, menu, myData, changeMenu, exit, requestDataList, menus, allPage, postMyEstimateData, currentMyData }) => {
  const navigate = useNavigate();

  // side menu
  const menuList = [
    {url:'/list', menu: '견적요청목록'}, 
    {url:'/request', menu: '견적요청하기'}, 
    {url:'/my', menu: '나의견적확인'},
  ];

  useEffect(() => {
    if (!myData) {
      navigate('/my');
    };
    changeMenu('나의견적확인', menuList);
  }, []);

  // 전체 페이지 배열로 만드는 함수
  const allPageArray = (number) => {
    const array = [];
    for (let i = 0; i < number; i++) {
      array.push(i + 1)
    };
    return array;
  };

  // 나의 견적 요청 정보 요청하는 함수
  const onClick = () => {
    console.log('click');
  };

  //페이지 나가기
  const onOut = () => {
    exit();
    navigate('/my');
  };

  return (
    <main className={styles.myEstimateList}>
      <Header logoURL={logoURL} />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu menus={menus} />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader menu={menu} />
          <section>

            {/* 정보 목록 */}
            <div className={styles.dataList}>
              <span className={styles.id}>순번</span>
              <span className={styles.name}>등록자</span>
              <span className={styles.travelType}>여행구분</span>
              <span className={styles.departPlace}>출발지</span>
              <span className={styles.arrivalPlace}>도착지</span>
              <span className={styles.vehicleType}>차량구분</span>
              <span className={styles.createdDate}>요청일</span>
            </div>

            {/* 나의 견적 요청 목록 */}
            <ul>
              {requestDataList.map(data => (<MyEstimateListItem data={data} onClick={onClick} />))}
            </ul>

            {/* 페이지 버튼 */}
            <ul className={styles.pageList}>
              <button className={styles.prevPageButton}>
                <i class="fa-solid fa-caret-left"></i>
              </button>
              {allPageArray(allPage).map(number => (<PageButton page={number} getEstimateList={postMyEstimateData} currentMyData={currentMyData} />))}
              <button className={styles.nextPageButton}>
                <i class="fa-solid fa-caret-right"></i>
              </button>
            </ul>

            {/* 나가기 버튼 */}
            <button onClick={onOut}>나가기</button>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default MyEstimateList;