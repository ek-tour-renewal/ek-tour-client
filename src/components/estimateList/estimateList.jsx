import React, { useEffect, useState } from 'react';
import styles from './estimateList.module.css';
import SubHeader from '../subHeader/subHeader';
import EstimateListItem from '../estimateListItem/estimateListItem';
import PageButton from '../pageButton/pageButton';
import { Box } from '@mui/material';

const EstimateList = ({ changePage, ektour, page }) => {
  
  const [requestDataList, setRequestDataList] = useState();
  const [allPage, setAllPage] = useState();

  useEffect(() => {
    ektour.getTotalPageNum()
    .then(pages => {
      setAllPage(pages);
    })
    .catch(error => console.log(error));

    ektour.getEstimateListByPage(page)
    .then(response => {
      setRequestDataList(response);
    })
    .catch(error => console.log(error));
  }, [page]);

  // 페이지 리스트
  const allPageArray = (number) => {
    const array = [];
    for (let i = 0; i < number; i++) {
      array.push(i + 1);
    }
    return array;
  };

  return (
    <main>
      <section className={styles.estimateList}>
        <SubHeader menu='견적 목록' />
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
                    ektour={ektour}
                    changePage={changePage}
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