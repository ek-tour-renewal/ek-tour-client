import React, {useEffect, useState} from 'react';
import styles from './estimateList.module.css';
import {useNavigate, useParams} from 'react-router-dom';
import {getEstimateListByPage} from "../../api/estimate";
import {Box, Pagination, Stack} from '@mui/material';
import SubHeader from '../../components/subHeader/subHeader';
import EstimateListItem from '../../components/estimateListItem/estimateListItem';

const EstimateList = () => {
  const navigate = useNavigate();
  const {page} = useParams();

  const [estimateList, setEstimateList] = useState();
  const [allPage, setAllPage] = useState();

  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `이케이하나관광-견적목록`;
  }, [])

  useEffect(() => {
    getEstimateListByPage(page)
      .then(response => {
        if (response.totalPage < +page || 1 > +page) throw new Error("해당 페이지를 찾을 수 없습니다");
        setEstimateList(response.estimateList);
        setAllPage(response.totalPage);
      })
      .catch(error => {
        console.log(error)
        alert("페이지를 찾을 수 없습니다.")
      });
  }, [page]);

  const handleChangePage = (event, value) => {
    navigate('/estimate/list/' + value);
  }

  return (
    <main className={styles.estimateList}>
      <SubHeader menu='견적 목록'/>

      <section className={styles.dataListContainer}>
        <div className={styles.dataList}>
          <Box className={`${styles.column} ${styles.id}`}>순번</Box>
          <Box className={`${styles.column} ${styles.name}`}>등록자</Box>
          <Box className={`${styles.column} ${styles.travelType}`}>여행구분</Box>
          <Box className={`${styles.column} ${styles.departPlace}`}>출발지</Box>
          <Box className={`${styles.column} ${styles.arrivalPlace}`}>도착지</Box>
          <Box className={`${styles.column} ${styles.vehicleType}`}>차량구분</Box>
          <Box className={`${styles.column} ${styles.createdDate}`}>요청일</Box>
        </div>

        <ul>
          {
            estimateList ? estimateList.map(data => {
                return (
                  <EstimateListItem
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    travelType={data.travelType}
                    departPlace={data.departPlace}
                    arrivalPlace={data.arrivalPlace}
                    vehicleType={data.vehicleType}
                    createdDate={data.createdDate}
                  />
                )
              }) :
              <Box p={5}>
                견적 요청 내역이 없습니다.
              </Box>
          }
        </ul>

        <Stack spacing={0} m={1}>
          <Pagination
            count={allPage}
            page={parseInt(page)}
            shape='rounded'
            size='small'
            onChange={handleChangePage}
            sx={{margin: '0 auto'}}
          />
        </Stack>
      </section>
    </main>
  )
};

export default EstimateList;