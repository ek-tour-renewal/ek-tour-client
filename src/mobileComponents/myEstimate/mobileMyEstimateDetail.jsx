import { Alert, AlertTitle, Button, Dialog, DialogContent, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../Loading";

const Cell = (props) => {
  if (props.type === 'label')
    return <TableCell align='center' sx={{maxWidth: 80, wordBreak:'keep-all', backgroundColor: '#FAFAD2'}} colSpan={props.colSpan} rowSpan={props.rowSpan}>{props.element}</TableCell>
  else 
    return <TableCell align='left' colSpan={4} rowSpan={props.rowSpan}>{props.element}</TableCell>
}

export default function MobileMyEstimateDetail({ ektour }) {

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

  let currentDateTime = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

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
    departTime: '',
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
    departTime: '',
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
  const [infoPlace, setInfoPlace] = useState({
    departPlace: '',
    departPlaceDetail: '',
    departDate: '',
    departTime: '',
    arrivalPlace: '',
    arrivalPlaceDetail: '',
    arrivalDate: '',
    arrivalTime: ''
  });
  const [dataPlace, setDataPlace] = useState({
    departPlace: '',
    departPlaceDetail: '',
    departDate: '',
    departTime: '',
    arrivalPlace: '',
    arrivalPlaceDetail: '',
    arrivalDate: '',
    arrivalTime: ''
  });

  const [modify, setModify] = useState(false);
  const handleCancleModify = () => {
    setInfo(data);
    setInfoPlace({
      departPlace: dataPlace.departPlace,
      departPlaceDetail: dataPlace.departPlaceDetail,
      departDate: dataPlace.departDate,
      departTime: dataPlace.departTime,
      arrivalPlace: dataPlace.arrivalPlace,
      arrivalPlaceDetail: dataPlace.arrivalPlaceDetail,
      arrivalDate: dataPlace.arrivalDate,
      arrivalTime: dataPlace.arrivalTime
    });
    setModify(false);
  }
  const handleModifyState = () => { setModify(!modify); }

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name] : value });
  }

  const handlePlaceChange = (e) => {
    const { name, value } = e.target;
    setInfoPlace({ ...infoPlace, [name]: value });
  }

  useEffect(() => {
    ektour.getEstimateDetailByIdAndForm(state.form, estimateId)
    .then(response => {
      setData(response);
      setInfo(response);
      var dp = response.departPlace.substr(0, 4);
      var dpd = response.departPlace.substr(4);
      var dd = response.departDate.substr(0, 10);
      var dt = response.departDate.substr(11, 16);
      var ap = response.arrivalPlace.substr(0, 4);
      var apd = response.arrivalPlace.substr(4);
      var ad = response.arrivalDate.substr(0, 10);
      var at = response.arrivalDate.substr(11, 16);
      setDataPlace({
        departPlace: dp,
        departPlaceDetail: dpd,
        departDate: dd,
        departTime: dt,
        arrivalPlace: ap,
        arrivalPlaceDetail: apd,
        arrivalDate: ad,
        arrivalTime: at
      });
      setInfoPlace({
        departPlace: dp,
        departPlaceDetail: dpd,
        departDate: dd,
        departTime: dt,
        arrivalPlace: ap,
        arrivalPlaceDetail: apd,
        arrivalDate: ad,
        arrivalTime: at
      });
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const [nameErrorMsg, setNameErrorMsg] = useState(null);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [departPlaceDetailErrorMsg, setDepartPlaceDetailErrorMsg] = useState('');
  const [arrivalPlaceDetailErrorMsg, setArrivalPlaceDetailErrorMsg] = useState('');

  const validate = () => {
    var flag = true;
    var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (info.name === '') {
      setNameErrorMsg('????????? ??????????????????.');
      flag = false;
    } else setNameErrorMsg('');
    if (info.phone.includes('-')) {
      setPhoneErrorMsg(`'-' ?????? ????????? ??????????????????.`);
      flag = false;
    } else if (info.phone === '' || info.phone.length < 8) {
      setPhoneErrorMsg('???????????? ????????? ?????????.');
      flag = false;
    } else setPhoneErrorMsg('');
    if (info.email.length > 0 && regEmail.test(info.email) === false) {
      setEmailErrorMsg('???????????? ????????? ?????? ??????????????????.');
      flag = false;
    } else setEmailErrorMsg('');
    if (info.password === '' || info.password.length < 4) {
      setPasswordErrorMsg('????????? ???????????? 4????????? ??????????????????.');
      flag = false;
    } else setPasswordErrorMsg('');
    if (infoPlace.departPlaceDetail === '') {
      setDepartPlaceDetailErrorMsg('????????? ??????????????? ????????? ?????????.');
      flag = false;
    } else setDepartPlaceDetailErrorMsg('');
    if (infoPlace.arrivalPlaceDetail === '') {
      setArrivalPlaceDetailErrorMsg('????????? ??????????????? ????????? ?????????.');
      flag = false;
    } else setArrivalPlaceDetailErrorMsg('');
    return flag;
  };

  const handleModifyEstimate = () => {
    if(info === data) {
      setModify(false); return;
    }
    setLoading(true);
    if (validate()) {
      let form = {
        name: info.name,
        email: info.email,
        phone: info.phone,
        password: info.password,
        travelType: info.travelType,
        vehicleType: info.vehicleType,
        vehicleNumber: info.vehicleNumber,
        memberCount: info.memberCount,
        departDate: infoPlace.departDate + 'T' + infoPlace.departTime,
        arrivalDate: infoPlace.arrivalDate + 'T' + infoPlace.arrivalTime,
        departPlace: infoPlace.departPlace + infoPlace.departPlaceDetail,
        arrivalPlace: infoPlace.arrivalPlace + infoPlace.arrivalPlaceDetail,
        memo: info.memo,
        stopPlace: info.stopPlace,
        wayType: info.wayType,
        payment: info.payment,
        taxBill: info.taxBill
      }
      axios.put(`/estimate/${info.id}`, form)
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

  const inputNumber = (event) => {
    if (!/^[0-9]+$/.test(event.key) && event.key.length === 1) { event.preventDefault() };
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: '55vh' }}>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow sx={{ '& th': { bgcolor: '#FFD0AF', pt: 1, borderBottom: '2px solid #AE905E' } }}>
              <TableCell colSpan={5}><strong>??????????????? ???????????????.</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Cell type='label' element='?????????' />
              <Cell element={data.createdDate.slice(0, -3)} />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????????' />
              <Cell element={
                <TextField name='name' size='small' value={info.name} onChange={handleValueChange} inputProps={{ disabled: true }}
                  error={nameErrorMsg ? true : false} helperText={nameErrorMsg} />
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='????????????' />
              <Cell element={
                <TextField name='password' size='small' value={info.password} onChange={handleValueChange} inputProps={{ disabled: true }}
                  error={passwordErrorMsg ? true : false} helperText={passwordErrorMsg} />
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????????' />
              <Cell element={
                <TextField name='email' size='small' value={info.email} onChange={handleValueChange} inputProps={{ readOnly: !modify }}
                  error={emailErrorMsg ? true : false} helperText={emailErrorMsg} />
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????????' />
              <Cell element={
                <TextField name='phone' size='small' value={info.phone} onChange={handleValueChange} inputProps={{ readOnly: true }}
                  error={phoneErrorMsg ? true : false} helperText={phoneErrorMsg} />
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????? ??????' />
              <Cell element={
                <Select disabled={!modify} name="travelType" onChange={handleValueChange} size="small" value={info.travelType}><MenuItem value={"????????????"}>????????????</MenuItem><MenuItem value={"????????????"}>????????????</MenuItem><MenuItem value={"????????????"}>????????????</MenuItem><MenuItem value={"????????????"}>????????????</MenuItem></Select>
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????? ??????' />
              <Cell element={
                <Select disabled={!modify} name="vehicleType" onChange={handleValueChange} size="small" value={info.vehicleType}><MenuItem value={"25?????? ??????"}>25?????? ??????</MenuItem><MenuItem value={"28?????? ?????????"}>28?????? ?????????</MenuItem><MenuItem value={"45?????? ??????"}>45?????? ??????</MenuItem></Select>
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????? ??????' />
              <Cell element={
                <Select
                  size="small"
                  disabled={!modify}
                  name="vehicleNumber"
                  value={info.vehicleNumber}
                  onChange={handleValueChange}>
                  <MenuItem value="1">1???</MenuItem>
                  <MenuItem value="2">2???</MenuItem>
                  <MenuItem value="3">3???</MenuItem>
                  <MenuItem value="4">4???</MenuItem>
                  <MenuItem value="5">5???</MenuItem>
                  <MenuItem value="6">6???</MenuItem>
                  <MenuItem value="7">7???</MenuItem>
                  <MenuItem value="8">8???</MenuItem>
                  <MenuItem value="9">9???</MenuItem>
                  <MenuItem value="10">10??? ??????</MenuItem>
                </Select>              
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????? ???' />
              <Cell element={
                <TextField name='memberCount' size='small' value={info.memberCount} onChange={handleValueChange} onKeyDown={inputNumber} inputProps={{ readOnly: !modify }} />
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????? ??????' />
              <Cell element={
                <Stack direction='row'>
                  <Select
                    disabled={!modify}
                    size='small'
                    labelId='departPlace'
                    name='departPlace'
                    onChange={handlePlaceChange}
                    value={infoPlace.departPlace}>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                  </Select>
                  <TextField name='departPlaceDetail' size='small' value={infoPlace.departPlaceDetail} onChange={handlePlaceChange} 
                    inputProps={{ readOnly: !modify }} error={departPlaceDetailErrorMsg ? true : false} helperText={departPlaceDetailErrorMsg} />
                </Stack>
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????? ??????' />
              <Cell element={
                <Stack direction='row'>
                  <TextField type='date' name='departDate' size='small' value={infoPlace.departDate} onChange={handlePlaceChange} inputProps={{ readOnly: !modify, min: currentDateTime }} />
                  <Select
                  size='small'
                  name='departTime'
                  onChange={handlePlaceChange}
                  value={infoPlace.departTime}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                  disabled={!modify}
                  sx={{ backgroundColor: '#FCFCFC', width:'35%', ml: '5px' }}
                  style={{ height: 'fit-content' }}>
                  <MenuItem value='05:00'>05:00</MenuItem><MenuItem value='05:30'>05:30</MenuItem>
                  <MenuItem value='06:00'>06:00</MenuItem><MenuItem value='06:30'>06:30</MenuItem>
                  <MenuItem value='07:00'>07:00</MenuItem><MenuItem value='07:30'>07:30</MenuItem>
                  <MenuItem value='08:00'>08:00</MenuItem><MenuItem value='08:30'>08:30</MenuItem>
                  <MenuItem value='09:00'>09:00</MenuItem><MenuItem value='09:30'>09:30</MenuItem>
                  <MenuItem value='10:00'>10:00</MenuItem><MenuItem value='10:30'>10:30</MenuItem>
                  <MenuItem value='11:00'>11:00</MenuItem><MenuItem value='11:30'>11:30</MenuItem>
                  <MenuItem value='12:00'>12:00</MenuItem><MenuItem value='12:30'>12:30</MenuItem>
                  <MenuItem value='13:00'>13:00</MenuItem><MenuItem value='13:30'>13:30</MenuItem>
                  <MenuItem value='14:00'>14:00</MenuItem><MenuItem value='14:30'>14:30</MenuItem>
                  <MenuItem value='15:00'>15:00</MenuItem><MenuItem value='15:30'>15:30</MenuItem>
                  <MenuItem value='16:00'>16:00</MenuItem><MenuItem value='16:30'>16:30</MenuItem>
                  <MenuItem value='17:00'>17:00</MenuItem><MenuItem value='17:30'>17:30</MenuItem>
                  <MenuItem value='18:00'>18:00</MenuItem><MenuItem value='18:30'>18:30</MenuItem>
                  <MenuItem value='19:00'>19:00</MenuItem><MenuItem value='19:30'>19:30</MenuItem>
                  <MenuItem value='20:00'>20:00</MenuItem><MenuItem value='20:30'>20:30</MenuItem>
                  <MenuItem value='21:00'>21:00</MenuItem><MenuItem value='21:30'>21:30</MenuItem>
                  <MenuItem value='22:00'>22:00</MenuItem><MenuItem value='22:30'>22:30</MenuItem>
                  <MenuItem value='23:00'>23:00</MenuItem><MenuItem value='23:30'>23:30</MenuItem>
                  <MenuItem value='00:00'>00:00</MenuItem><MenuItem value='00:30'>00:30</MenuItem>
                  <MenuItem value='01:00'>01:00</MenuItem><MenuItem value='01:30'>01:30</MenuItem>
                  <MenuItem value='02:00'>02:00</MenuItem><MenuItem value='02:30'>02:30</MenuItem>
                  <MenuItem value='03:00'>03:00</MenuItem><MenuItem value='03:30'>03:30</MenuItem>
                  <MenuItem value='04:00'>04:00</MenuItem><MenuItem value='04:30'>04:30</MenuItem>
                </Select>
              </Stack>
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????? ??????' />
              <Cell element={
                <Stack direction='row'>
                  <Select
                    disabled={!modify}
                    size='small'
                    labelId='arrivalPlace'
                    name='arrivalPlace'
                    onChange={handlePlaceChange}
                    value={infoPlace.arrivalPlace}>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                    <MenuItem value='[??????]'>??????</MenuItem>
                  </Select>
                  <TextField name='arrivalPlaceDetail' size='small' value={infoPlace.arrivalPlaceDetail} 
                    onChange={handlePlaceChange} inputProps={{ readOnly: !modify }} error={arrivalPlaceDetailErrorMsg ? true : false} helperText={arrivalPlaceDetailErrorMsg}  />
                </Stack>
              } />
            </TableRow>
            <TableRow>
              <Cell type='label' element='?????? ??????' />
              <Cell element={
                <Stack direction='row'>
                  <TextField type='date' name='arrivalDate' size='small' width='60%' value={infoPlace.arrivalDate} onChange={handlePlaceChange} inputProps={{ readOnly: !modify, min: currentDateTime }} />
                  <Select
                  size='small'
                  name='arrivalTime'
                  onChange={handlePlaceChange}
                  value={infoPlace.arrivalTime}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                  disabled={!modify}
                  sx={{ backgroundColor: '#FCFCFC', width:'35%', ml: '5px' }}
                  style={{ height: 'fit-content' }}>
                  <MenuItem value='05:00'>05:00</MenuItem><MenuItem value='05:30'>05:30</MenuItem>
                  <MenuItem value='06:00'>06:00</MenuItem><MenuItem value='06:30'>06:30</MenuItem>
                  <MenuItem value='07:00'>07:00</MenuItem><MenuItem value='07:30'>07:30</MenuItem>
                  <MenuItem value='08:00'>08:00</MenuItem><MenuItem value='08:30'>08:30</MenuItem>
                  <MenuItem value='09:00'>09:00</MenuItem><MenuItem value='09:30'>09:30</MenuItem>
                  <MenuItem value='10:00'>10:00</MenuItem><MenuItem value='10:30'>10:30</MenuItem>
                  <MenuItem value='11:00'>11:00</MenuItem><MenuItem value='11:30'>11:30</MenuItem>
                  <MenuItem value='12:00'>12:00</MenuItem><MenuItem value='12:30'>12:30</MenuItem>
                  <MenuItem value='13:00'>13:00</MenuItem><MenuItem value='13:30'>13:30</MenuItem>
                  <MenuItem value='14:00'>14:00</MenuItem><MenuItem value='14:30'>14:30</MenuItem>
                  <MenuItem value='15:00'>15:00</MenuItem><MenuItem value='15:30'>15:30</MenuItem>
                  <MenuItem value='16:00'>16:00</MenuItem><MenuItem value='16:30'>16:30</MenuItem>
                  <MenuItem value='17:00'>17:00</MenuItem><MenuItem value='17:30'>17:30</MenuItem>
                  <MenuItem value='18:00'>18:00</MenuItem><MenuItem value='18:30'>18:30</MenuItem>
                  <MenuItem value='19:00'>19:00</MenuItem><MenuItem value='19:30'>19:30</MenuItem>
                  <MenuItem value='20:00'>20:00</MenuItem><MenuItem value='20:30'>20:30</MenuItem>
                  <MenuItem value='21:00'>21:00</MenuItem><MenuItem value='21:30'>21:30</MenuItem>
                  <MenuItem value='22:00'>22:00</MenuItem><MenuItem value='22:30'>22:30</MenuItem>
                  <MenuItem value='23:00'>23:00</MenuItem><MenuItem value='23:30'>23:30</MenuItem>
                  <MenuItem value='00:00'>00:00</MenuItem><MenuItem value='00:30'>00:30</MenuItem>
                  <MenuItem value='01:00'>01:00</MenuItem><MenuItem value='01:30'>01:30</MenuItem>
                  <MenuItem value='02:00'>02:00</MenuItem><MenuItem value='02:30'>02:30</MenuItem>
                  <MenuItem value='03:00'>03:00</MenuItem><MenuItem value='03:30'>03:30</MenuItem>
                  <MenuItem value='04:00'>04:00</MenuItem><MenuItem value='04:30'>04:30</MenuItem>
                </Select>
              </Stack>
              } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='?????????' />
            <Cell element={
              <TextField name='stopPlace' size='small' value={info.stopPlace} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='?????? ??????' />
            <Cell element={
              <RadioGroup row onChange={handleValueChange} value={info.wayType}>
                <FormControlLabel name='wayType' value="??????" control={<Radio size='small' />} label="??????" disabled={!modify} />
                <FormControlLabel name='wayType' value="??????" control={<Radio size='small' />} label="??????" disabled={!modify} />
              </RadioGroup>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='?????? ??????' />
            <Cell element={
              <RadioGroup row onChange={handleValueChange} value={info.payment}>
                <FormControlLabel name='payment' value="??????" control={<Radio size='small' />} label="??????" disabled={!modify} />
                <FormControlLabel name='payment' value="??????" control={<Radio size='small' />} label="??????" disabled={!modify} />
              </RadioGroup>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='?????? ?????????' />
            <Cell element={
              <RadioGroup row onChange={handleValueChange} value={info.taxBill}>
                <FormControlLabel name='taxBill' value="??????" control={<Radio size='small' />} label="??????" disabled={!modify} />
                <FormControlLabel name='taxBill' value="????????????" control={<Radio size='small' />} label="????????????" disabled={!modify} />
              </RadioGroup>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='?????? ?????? ??????' />
            <Cell element={
              <TextField name='memo' size='small' value={info.memo} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
      <Stack direction='row' sx={{display: 'flex', justifyContent: 'center'}} mt={1} spacing={1}>
        <Button onClick={handleClickDelete} color='error'>??????</Button>
        {
          modify
          ? <>
              <Button onClick={handleModifyEstimate} color='success'>????????????</Button>
              <Button onClick={handleCancleModify}>????????????</Button>
            </>
          : <Button onClick={handleModifyState}>??????</Button>
        }
        <Button href='javascript:history.back()'>??????</Button>
      </Stack>

      <Loading open={loading} />

      <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="success" sx={{ width: '100%' }}>
          ?????? ?????? ????????? ??????????????????.
        </Alert>
      </Snackbar>

      <Snackbar open={successDelete} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="success" sx={{ width: '100%' }}>
          ?????? ?????? ????????? ??????????????????.
        </Alert>
      </Snackbar>

      <Snackbar open={fail} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="error" sx={{ width: '100%' }}>
          ????????? ??????????????????. ?????? ??? ?????? ??????????????????.
        </Alert>
      </Snackbar>

      {/* ?????? ?????? ?????? ??????????????? */}
      <Dialog open={openDelete} onClose={handleCloseDeleteDialog}>
        <DialogContent>
          <Alert severity="error">
            <AlertTitle>
              <strong style={{ fontSize: 18 }}>?????? ?????? ??????</strong>
            </AlertTitle>
            ????????? ?????? ?????? ????????? ?????????????????????????
          </Alert>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClickDeleteEstimate}>???</Button>
            <Button onClick={handleCloseDeleteDialog}>?????????</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}