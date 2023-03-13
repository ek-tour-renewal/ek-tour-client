import React, { useEffect, useState } from 'react';
import styles from './estimateList.module.css';
import SubHeader from '../../components/subHeader/subHeader';
import EstimateListItem from '../../components/estimateListItem/estimateListItem';
import { Box, Pagination, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const EstimateList = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  
  const [requestDataList, setRequestDataList] = useState();
  const [allPage, setAllPage] = useState();

  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `이케이하나관광-견적목록`;

    axios.getEstimateListByPage(page)
    .then(response => {
      if (response.totalPage < parseInt(page) || 1 > parseInt(page)) throw new Error("해당 페이지를 찾을 수 없습니다");
      setRequestDataList(response.estimateList);
      setAllPage(response.totalPage);
    })
    .catch(error => { console.log(error); });
  }, [page]);

  const handleChangePage = (event, value) => {
    navigate('/estimate/list/' + value);
  }

  return (
    <>
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
          <Stack spacing={0} m={1}>
            <Pagination 
              count={allPage}
              page={parseInt(page)} 
              shape='rounded' 
              size='small'
              onChange={handleChangePage}
              sx={{ margin: '0 auto' }}
            />
          </Stack>
        </section>
      </section>
    </>
  )
};

export default EstimateList;