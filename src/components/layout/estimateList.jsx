import React from "react";
import styles from './estimateList.module.css';
import {Box} from '@mui/material';

export default function EstimateListLayout({children}) {
  return (
    <main className={styles.estimateList}>
      <section className={styles.subHeader}>
        <h1 className={styles.title}>견적 목록</h1>
      </section>

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

        {children}
      </section>
    </main>
  )
};