import { Box, CircularProgress, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MobileMyEstimateItem from "./mobileMyEstimateItem";

export default function MobileMyEstimateList({ ektour }) {

  const navigate = useNavigate();
  const { page } = useParams();
  const { state } = useLocation();

  const [estimateList, setEstimateList] = useState();
  const [allPage, setAllPage] = useState();

  useEffect(() => {
    if (!state) throw new Error('잘못된 접근입니다.');
    ektour.getMyEstimateListByFormAndPage(state.form, page)
    .then(response => {
      setEstimateList(response.estimateList);
      setAllPage(response.totalPage);
    })
    .catch(error => { console.log(error); });
  }, [page]);

  const handleChangePage = (event, value) => {
    navigate('/mobile/myestimate/list/' + value, { state: { form: state.form } });
  }

  return (
    <Box mt='30%'>
      <Typography variant="h6" component='div' m={2} p={1} 
        sx={{display: 'flex', justifyContent: 'center', bgcolor: '#ffc476', borderRadius: '14px', color: 'white', fontWeight: 'bold'}}>
        요청한 견적 목록
      </Typography>

      <Table size='small'>
        <TableHead>
          <TableRow sx={{ '& th': {bgcolor: '#fff4e5'} }}>
            <TableCell align='center'><strong>등록자</strong></TableCell>
            <TableCell align='center'><strong>여행구분</strong></TableCell>
            <TableCell align='center'><strong>요청일</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            estimateList ? estimateList.map((e) => {
              return (
                <MobileMyEstimateItem 
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  travelType={e.travelType}
                  createdDate={e.createdDate}
                />
              )
            })
            : <TableRow><TableCell colSpan={3} align='center'><CircularProgress /></TableCell></TableRow>
          }
        </TableBody>
      </Table>

      <Pagination
        count={allPage}
        page={parseInt(page)}
        shape='rounded' 
        size='small'
        onChange={handleChangePage} 
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
}