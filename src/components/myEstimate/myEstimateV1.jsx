import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, MenuItem, Select, Stack, Table, TableBody, TableRow, TextField, Typography } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

// props 정보
// open : Dialog의 open 여부를 결정할 state
// onClose : Dialog를 close할 function
// estimateId : 확인할 견적의 ID
// userName : 확인할 견적의 등록자명
// ektour : 통신 처리할 ektour Class
export default function MyEstimate(props) {

  const navigate = useNavigate();

  const { page } = useParams();

  const defaultMessage = '견적 확인은 등록 시 입력한 핸드폰 번호와 비밀번호로 확인합니다.';
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const [myInfo, setMyInfo] = useState({
    firstNum: '010',
    middleNum: '',
    lastNum: '',
    password: ''
  });

  const handleValueChange = (e) => {
    const {name, value} = e.target;
    if (value.length > 4) return;
    setMyInfo({
      ...myInfo,
      [name]: value
    });
  }

  const handleCloseDialog = () => {
    props.onClose();
    setMyInfo({firstNum: '010', middleNum: '', lastNum: '', password: ''});
    setMessage(defaultMessage);
  }

  // 나의 견적 확인 (내 정보 입력)
  const onSubmit = (e) => {
    e.preventDefault();
    var form = {phone: myInfo.firstNum + myInfo.middleNum + myInfo.lastNum, password: myInfo.password};

    if (form.phone.length < 11 || form.password.length < 4) {
      console.log(form);
      setMessage('핸드폰 번호 / 비밀번호를 정확히 입력해주세요.');
    }
    else {
      setLoading(true); // 로딩 시작
      if (props.estimateId) { // 모든 견적 목록 -> 견적 상세보기
        axios.post('/estimate/' + props.estimateId, form)
        .then((response) => {
          if (response.data.length < 1) {
            setMessage('핸드폰 번호 / 비밀번호를 다시 확인해주세요.');
          } else {
            // 검증 성공, 응답 데이터(견적 상세 정보) push
            navigate(`/estimate/list/${page}/${props.estimateId}`);
          }
        })
        .catch((error) => { console.log(error.response) })
        .finally(() => { setLoading(false); });
      } 
      else { // 내 견적 목록 확인
        axios.post('/estimate/search/my', form)
        .then((response) => {
          console.log(response.data);
          if (response.data.length < 1) { // 핸드폰, 비밀번호 틀림
            setMessage('핸드폰 번호 / 비밀번호를 다시 확인해주세요.');
          } else {
            // 검증 성공, location에 요청 form, response의 견적 목록 push
            navigate('/estimate/my/list/1', {
              state: {
                form: { phone: form.phone, password: form.password },
                estimateList: response.data
              }
            });
            handleCloseDialog();
          }
        })
        .catch((error) => { console.log(error.response); })
        .finally(() => { setLoading(false); });
      }
    }
  };

  return (
    <Dialog open={props.open} onClose={handleCloseDialog}>
      <DialogTitle sx={{bgcolor: '#e7ebf0'}}>
        <Box sx={{display: 'table'}}>
          <Typography variant='h5' sx={{display: 'table-cell', verticalAlign: 'middle', width: '100%'}}>
            {props.userName ? props.userName + '님의 견적 요청 확인하기' : '내 견적 요청 내역 확인하기'}
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {
          message !== defaultMessage
          ? <Alert severity='error'>{message}</Alert>
          : <Alert severity='info'>{defaultMessage}</Alert>
        }
        <form onSubmit={onSubmit}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Table size='small' sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none" }, width: '80%', m: 2 }}>
            <TableBody>
              <TableRow>
                <TableCell><Typography variant='subtitle1'>핸드폰</Typography></TableCell>
                <TableCell sx={{width: '70%'}}>
                  <Stack direction='row' spacing={1}>
                    <Select onChange={handleValueChange} name="firstNum" size='small' value={myInfo.firstNum}>
                      <MenuItem value='010'>010</MenuItem>
                      <MenuItem value='011'>011</MenuItem>
                      <MenuItem value='016'>016</MenuItem>
                      <MenuItem value='017'>017</MenuItem>
                      <MenuItem value='018'>018</MenuItem>
                      <MenuItem value='019'>019</MenuItem>
                    </Select>
                    <Typography variant='h5'>-</Typography>
                    <TextField onChange={handleValueChange} name="middleNum" size='small' inputProps={{ maxLength: 4, type: 'tel' }} value={myInfo.middleNum} />
                    <Typography variant='h5'>-</Typography>
                    <TextField onChange={handleValueChange} name="lastNum" size='small' inputProps={{ maxLength: 4, type: 'tel' }} value={myInfo.lastNum} />
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant='subtitle1'>비밀번호</Typography></TableCell>
                <TableCell>
                  <TextField onChange={handleValueChange} name="password" size='small' inputProps={{ maxLength: 4, type: 'password' }} value={myInfo.password} sx={{width: '100%'}} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          { 
            loading
            ? <LoadingButton type='submit' variant='outlined' loading={true}>확인</LoadingButton>
            : <LoadingButton type='submit' variant='contained' style={{backgroundColor: '#5a4231'}} 
                loading={false}>확인</LoadingButton>
          }
          <Box sx={{margin: '0 3px'}} />
          <Button type='button' variant='outlined' style={{color: '#5a4231', borderColor: '#5a4231'}} 
            onClick={handleCloseDialog}>취소</Button>
        </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

