import { Box, CircularProgress, Grid, List, Pagination, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
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
    navigate(`/mobile/myestimate/list/${value}`, { state: { form: state.form } });
  }

  return (
    <Box mt='20%'>
      <Typography variant="h6" component='div' m={2} p={1} 
        sx={{display: 'flex', justifyContent: 'center', bgcolor: '#ffc476', borderRadius: '14px', color: 'white', fontWeight: 'bold'}}>
        요청한 견적 목록
      </Typography>

      <Typography variant='caption'>요청일 순으로 조회됩니다.</Typography>

      <Table size='small'>
        <TableHead>
          <TableRow sx={{ '& th': {bgcolor: '#fff4e5', borderTop: '2px solid #8B4513', borderBottom: '2px solid #8B4513'} }}>
            <TableCell>
              <Grid container>
                <Grid item xs={3} sx={{fontWeight: 'bold'}}>등록자</Grid>
                <Grid item xs={4} sx={{fontWeight: 'bold'}}>여행구분</Grid>
                <Grid item xs={5} sx={{fontWeight: 'bold'}}>요청일</Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <List disablePadding>
      {
        estimateList ? estimateList.map((e) => {
          return (
            <MobileMyEstimateItem 
              key={e.id}
              id={e.id}
              name={e.name}
              travelType={e.travelType}
              createdDate={e.createdDate}
              ektour={ektour}
            />
          )
        })
        : <CircularProgress />
      }
      </List>

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