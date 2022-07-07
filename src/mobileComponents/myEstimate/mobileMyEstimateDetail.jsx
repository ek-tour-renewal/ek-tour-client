import { Alert, AlertTitle, Button, Dialog, DialogContent, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

const Cell = (props) => {
  if (props.type === 'label')
    return <TableCell align='center' sx={{maxWidth: 80, wordBreak:'keep-all', backgroundColor: '#FAFAD2'}} colSpan={props.colSpan} rowSpan={props.rowSpan}>{props.element}</TableCell>
  else 
    return <TableCell align='left' colSpan={4} rowSpan={props.rowSpan}>{props.element}</TableCell>
}

export default function MobileMyEstimateDetail({ ektour }) {

  const navigate = useNavigate();
  const { page, estimateId } = useParams();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [fail, setFail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickDelete = () => { setOpenDelete(true); }
  const handleCloseDeleteDialog = () => { setOpenDelete(false); }

  const handleCloseSnackBar = () => { setSuccess(false); setFail(false); setSuccessDelete(false); }

  let currentDateTime = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  const [data, setData] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    travelType: '',
    vehicleType: '',
    vehicleNumber: '',
    memberCount: '',
    departDate: '',
    arrivalDate: '',
    departPlace: '',
    arrivalPlace: '',
    memo: '',
    stopPlace: '',
    wayType: '',
    payment: '',
    taxBill: '',
    createdDate: '',
    ip: ''
  });

  const [info, setInfo] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    travelType: '',
    vehicleType: '',
    vehicleNumber: '',
    memberCount: '',
    departDate: '',
    arrivalDate: '',
    departPlace: '',
    arrivalPlace: '',
    memo: '',
    stopPlace: '',
    wayType: '',
    payment: '',
    taxBill: '',
    createdDate: '',
    ip: ''
  });

  const [modify, setModify] = useState(false);
  const handleCancleModify = () => {
    setInfo(data);
    setModify(false);
  }
  const handleModifyState = () => { setModify(!modify); }

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name] : value });
  }

  useEffect(() => {
    ektour.getEstimateDetailByIdAndForm(state.form, estimateId)
    .then(response => {
      console.log(response);
      setData(response);
      setInfo(response);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const [nameErrorMsg, setNameErrorMsg] = useState(null);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);

  const validate = () => {
    var flag = true;
    var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (info.name === '') {
      setNameErrorMsg('이름을 입력해주세요.');
      flag = false;
    } else setNameErrorMsg('');
    if (info.phone.includes('-')) {
      setPhoneErrorMsg(`'-' 빼고 숫자만 입력해주세요.`);
      flag = false;
    } else if (info.phone === '' || info.phone.length < 8) {
      setPhoneErrorMsg('연락처를 입력해 주세요.');
      flag = false;
    } else setPhoneErrorMsg('');
    if (info.email.length > 0 && regEmail.test(info.email) === false) {
      setEmailErrorMsg('이메일을 형식에 맞게 입력해주세요.');
      flag = false;
    } else setEmailErrorMsg('');
    if (info.password === '' || info.password.length < 4) {
      setPasswordErrorMsg('확인용 비밀번호 4자리를 입력해주세요.');
      flag = false;
    } else setPasswordErrorMsg('');
    return flag;
  };

  const handleModifyEstimate = () => {
    if(info === data) {
      setModify(false); return;
    }
    setLoading(true);
    if (validate()) {
      axios.put(`/estimate/${info.id}`, info)
      .then(response => {
        setSuccess(true);
        setData(info);
      })
      .catch(error => { console.log(error); })
      .finally(() => {
        setModify(false);
        setLoading(false);
      });
    }
    setLoading(false);
  }

  const handleClickDeleteEstimate = () => {
    setLoading(true);
    axios.delete(`/estimate/${info.id}`)
    .then(response => {
      setOpenDelete(false);
      setSuccessDelete(true);
      window.history.back();
    })
    .catch(error => {
      console.log(error);
      setFail(true);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
    <>
      <TableContainer sx={{maxHeight: '55vh'}}>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow sx={{ '& th': {bgcolor: '#FFD0AF', pt: 1, borderBottom: '2px solid #AE905E'} }}>
            <TableCell colSpan={5}><strong>스크롤하여 확인하세요.</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <Cell type='label' element='요청일' />
            <Cell element={data.createdDate.slice(0, -3)} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='등록자' />
            <Cell element={
              <TextField name='name' size='small' value={info.name} onChange={handleValueChange} inputProps={{ disabled: true }} 
                error={nameErrorMsg ? true : false} helperText={nameErrorMsg} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='비밀번호' />
            <Cell element={
              <TextField name='password' size='small' value={info.password} onChange={handleValueChange} inputProps={{ disabled: true }}
                error={passwordErrorMsg ? true : false} helperText={passwordErrorMsg} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='이메일' />
            <Cell element={
              <TextField name='email' size='small' value={info.email} onChange={handleValueChange} inputProps={{ readOnly: !modify }}
                error={emailErrorMsg ? true : false} helperText={emailErrorMsg} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='핸드폰' />
            <Cell element={
              <TextField name='phone' size='small' value={info.phone} onChange={handleValueChange} inputProps={{ readOnly: !modify }}
                error={phoneErrorMsg ? true : false} helperText={phoneErrorMsg} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='여행 구분' />
            <Cell element={
              <Select labelId="travelType" name="travelType" onChange={handleValueChange} size="small" value={info.travelType}><MenuItem value={"일반여행"}>일반여행</MenuItem><MenuItem value={"관혼상제"}>관혼상제</MenuItem><MenuItem value={"학교단체"}>학교단체</MenuItem><MenuItem value={"기타단체"}>기타단체</MenuItem></Select>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='차량 구분' />
            <Cell element={
              <Select labelId="vehicleType" name="vehicleType" onChange={handleValueChange} size="small" value={info.vehicleType}><MenuItem value={"25인승 소형"}>25인승 소형</MenuItem><MenuItem value={"28인승 리무진"}>28인승 리무진</MenuItem><MenuItem value={"45인승 대형"}>45인승 대형</MenuItem></Select>           
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='차량 대수' />
            <Cell element={
              <TextField name='vehicleNumber' size='small' value={info.vehicleNumber} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='인원 수' />
            <Cell element={
              <TextField name='memberCount' size='small' value={info.memberCount} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='출발 장소' />
            <Cell element={
              <TextField name='departPlace' size='small' value={info.departPlace} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='출발 일자' />
            <Cell element={
              <TextField type='datetime-local' name='departDate' size='small' value={info.departDate} onChange={handleValueChange} inputProps={{ readOnly: !modify, min: currentDateTime }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='귀행 장소' />
            <Cell element={
              <TextField name='arrivalPlace' size='small' value={info.arrivalPlace} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='귀행 일자' />
            <Cell element={
              <TextField type='datetime-local' name='arrivalDate' size='small' value={info.arrivalDate} onChange={handleValueChange} inputProps={{ readOnly: !modify, min: currentDateTime }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='경유지' />
            <Cell element={
              <TextField name='stopPlace' size='small' value={info.stopPlace} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='왕복 구분' />
            <Cell element={
              <RadioGroup row onChange={handleValueChange} value={info.wayType}>
                <FormControlLabel name='wayType' value="왕복" control={<Radio size='small' />} label="왕복" disabled={!modify} />
                <FormControlLabel name='wayType' value="편도" control={<Radio size='small' />} label="편도" disabled={!modify} />
              </RadioGroup>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='결제 방식' />
            <Cell element={
              <RadioGroup row onChange={handleValueChange} value={info.payment}>
                <FormControlLabel name='payment' value="현금" control={<Radio size='small' />} label="현금" disabled={!modify} />
                <FormControlLabel name='payment' value="카드" control={<Radio size='small' />} label="카드" disabled={!modify} />
              </RadioGroup>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='세금 계산서' />
            <Cell element={
              <RadioGroup row onChange={handleValueChange} value={info.taxBill}>
                <FormControlLabel name='taxBill' value="발급" control={<Radio size='small' />} label="발급" disabled={!modify} />
                <FormControlLabel name='taxBill' value="발급안함" control={<Radio size='small' />} label="발급안함" disabled={!modify} />
              </RadioGroup>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='기타 요청 사항' />
            <Cell element={
              <TextField name='memo' size='small' value={info.memo} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
      <Stack direction='row' sx={{display: 'flex', justifyContent: 'center'}} mt={1} spacing={1}>
        <Button onClick={handleClickDelete} color='error'>삭제</Button>
        {
          modify
          ? <>
              <Button onClick={handleModifyEstimate} color='success'>수정완료</Button>
              <Button onClick={handleCancleModify}>수정취소</Button>
            </>
          : <Button onClick={handleModifyState}>수정</Button>
        }
        <Button href='javascript:history.back()'>뒤로</Button>
      </Stack>

      <Loading open={loading} />

      <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="success" sx={{ width: '100%' }}>
          견적 요청 내용을 수정했습니다.
        </Alert>
      </Snackbar>

      <Snackbar open={successDelete} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="success" sx={{ width: '100%' }}>
          견적 요청 내용을 삭제했습니다.
        </Alert>
      </Snackbar>

      <Snackbar open={fail} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="error" sx={{ width: '100%' }}>
          오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </Alert>
      </Snackbar>

      {/* 삭제 여부 묻는 다이얼로그 */}
      <Dialog open={openDelete} onClose={handleCloseDeleteDialog}>
        <DialogContent>
          <Alert severity="error">
            <AlertTitle>
              <strong style={{ fontSize: 18 }}>견적 요청 삭제</strong>
            </AlertTitle>
            정말로 해당 견적 요청을 삭제하시겠습니까?
          </Alert>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClickDeleteEstimate}>예</Button>
            <Button onClick={handleCloseDeleteDialog}>아니오</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}