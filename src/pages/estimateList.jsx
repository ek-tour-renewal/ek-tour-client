import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getEstimateListByPage} from "../api/estimate";
import {Box, Pagination, Stack} from '@mui/material';
import EstimateListItem from '../components/estimate/estimateListItem';
import EstimateListLayout from "../components/layout/estimateList";

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
    <EstimateListLayout>
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
    </EstimateListLayout>
  )
};

export default EstimateList;