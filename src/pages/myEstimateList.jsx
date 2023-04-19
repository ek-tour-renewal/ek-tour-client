import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {getMyEstimateList} from "../api/estimate";
import {Box, Pagination, Stack} from '@mui/material';
import EstimateListLayout from "../components/layout/estimateList";
import EstimateListItem from '../components/estimate/estimateListItem';

export default function MyEstimateList() {
  const navigate = useNavigate();
  const {page} = useParams();
  const {state} = useLocation();

  const [requestDataList, setRequestDataList] = useState();
  const [allPage, setAllPage] = useState(1);

  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `이케이하나관광-내 견적 목록`;
  }, [])

  useEffect(() => {
    if (!state) throw new Error('잘못된 접근입니다.');
    if (page > allPage) throw new Error('해당 페이지를 찾을 수 없습니다.');

    getMyEstimateList(state.form, page)
      .then(response => {
        if (response.totalPage < +page || 1 > +page) navigate('/error');
        setRequestDataList(response.estimateList);
        setAllPage(response.totalPage);
      })
      .catch(console.log)
  }, [page])

  const handleChangePage = (event, value) => {
    navigate(`/estimate/my/list/${page}/${value}`, {state: {form: state.form}});
  }

  return (
    <EstimateListLayout>
      {requestDataList ? requestDataList.map((request) => {
        return (
          <EstimateListItem
            key={request.id}
            id={request.id}
            name={request.name}
            travelType={request.travelType}
            departPlace={request.departPlace}
            arrivalPlace={request.arrivalPlace}
            vehicleType={request.vehicleType}
            createdDate={request.createdDate}
            myEstimate={'true'}
          />
        )
      }) : <Box p={5}>견적 요청 내역이 없습니다.</Box>
      }

      <Stack spacing={0} m={1}>
        <Pagination
          count={allPage}
          page={+page}
          shape='rounded'
          size='small'
          onChange={handleChangePage}
          sx={{margin: '0 auto'}}
        />
      </Stack>
    </EstimateListLayout>
  )
}