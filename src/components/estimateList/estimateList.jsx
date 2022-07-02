import React, { useEffect, useState } from 'react';
import styles from './estimateList.module.css';
import SubHeader from '../subHeader/subHeader';
import EstimateListItem from '../estimateListItem/estimateListItem';
import PageButton from '../pageButton/pageButton';
import { Box } from '@mui/material';

const EstimateList = ({ menu, ektour }) => {
  
  const [requestDataList, setRequestDataList] = useState();
  const [allPage, setAllPage] = useState();

  const getEstimateList = (pageNumber) => {
    ektour
      .getData(pageNumber)
      .then(response => {
        setRequestDataList(response);
      })
      .catch(error => console.log(error))
  };

  useEffect(() => {
    ektour
    .getData(0)
    .then(response => {
      setRequestDataList(response);
      console.log(response);
    })
    .catch(error => console.log(error));
    ektour
      .getAllPageCount()
      .then(pages => setAllPage(pages.data.totalCount))
      .catch(error => console.log(error))
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
    <main>
      <section className={styles.estimateList}>
        <SubHeader menu={menu} />
        <section className={styles.dataListContainer}>
          <div className={styles.dataList}>
            <span className={styles.id}>순번</span>
            <span className={styles.name}>등록자</span>
            <span className={styles.travelType}>여행구분</span>
            <span className={styles.departPlace}>출발지</span>
            <span className={styles.arrivalPlace}>도착지</span>
            <span className={styles.vehicleType}>차량구분</span>
            <span className={styles.createdDate}>요청일</span>
          </div>
          {
            requestDataList ? requestDataList.map((e) => {
              return (
                <EstimateListItem 
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  travelType={e.travelType}
                  departPlace={e.departPlace}
                  arrivalPlace={e.arrivalPlace}
                  vehicleType={e.vehicleType}
                  createdDate={e.createdDate}
                />
              );
            }) :
            <Box p={5}>
              견적 요청 내역이 없습니다.
            </Box>
          }
          <ul className={styles.pageList}>
            <button className={styles.prevPageButton}>
              <i className="fa-solid fa-caret-left"></i>
            </button>
            {
              allPageArray(allPage).map((number) => {
                return (
                  <PageButton
                    key={number}
                    page={number} 
                    getEstimateList={getEstimateList} 
                  />
                );
              })
            }
            <button className={styles.nextPageButton}>
              <i className="fa-solid fa-caret-right"></i>
            </button>
          </ul>
        </section>
      </section>
    </main>
  )
};

export default EstimateList;