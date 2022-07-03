import React, { useEffect, useState } from 'react';
import styles from './estimateList.module.css';
import SubHeader from '../subHeader/subHeader';
import EstimateListItem from '../estimateListItem/estimateListItem';
import { Box, Pagination, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EstimateList = ({ ektour, props }) => {

  const navigate = useNavigate();
  
  const { page } = useParams();
  
  const [requestDataList, setRequestDataList] = useState();
  const [allPage, setAllPage] = useState();

  useEffect(() => {
    ektour.getEstimateListByPage(page)
    .then(response => {
      console.log(response);
      if (response.totalPage < parseInt(page) || 1 > parseInt(page)) navigate('/error');
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
                  ektour={ektour}
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