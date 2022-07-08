import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TableCell from "@mui/material/TableCell";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import axios from "axios";

const Cell = (props) => {
  if (props.type === "label")
    return (
      <TableCell
        align="right"
        sx={{ minWidth: 80 }}
        colSpan={props.colSpan}
        rowSpan={props.rowSpan}
      >
        {props.element}
      </TableCell>
    );
  else
    return (
      <TableCell align="left" colSpan={props.colSpan} rowSpan={props.rowSpan}>
        {props.element}
      </TableCell>
    );
};

export default function EstimateDetail({ ektour }) {
  const navigate = useNavigate();
  const { page, estimateId } = useParams();
  const { state } = useLocation();

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleClickUpdateDialog = () => { setOpenUpdate(true); }
  const handleCloseUpdateDialog = () => { 
    setOpenUpdate(false);
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

  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDeleteDialog = () => { setOpenDelete(false); };

  // 수정 - 유효성 검사
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [vehicleTypeErrorMsg, setVehicleTypeErrorMsg] = useState('');
  const [vehicleNumberErrorMsg, setVehicleNumberErrorMsg] = useState('');
  const [departPlaceDetailErrorMsg, setDepartPlaceDetailErrorMsg] = useState('');
  const [arrivalPlaceDetailErrorMsg, setArrivalPlaceDetailErrorMsg] = useState('');
  const [memberCountErrorMsg, setMemberCountErrorMsg] = useState('');

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
    if (regEmail.test(info.email) === false && info.email.length > 0) {
      setEmailErrorMsg('이메일 형식에 맞게 입력 해 주세요.');
      flag = false;
    } else setEmailErrorMsg('');
    if (info.password === '' || info.password.length < 4) {
      setPasswordErrorMsg('확인용 비밀번호 숫자 4자리를 입력해주세요.');
      flag = false;
    } else setPasswordErrorMsg('');
    if (info.vehicleType === '') {
      setVehicleTypeErrorMsg('차량 종류를 선택해 주세요.');
      flag = false;
    } else setVehicleTypeErrorMsg('');
    if (info.vehicleNumber === '') {
      setVehicleNumberErrorMsg('차량 대수를 선택해 주세요.');
      flag = false;
    } else setVehicleNumberErrorMsg('');
    if (infoPlace.departPlaceDetail === '') {
      setDepartPlaceDetailErrorMsg('출발지 세부정보를 입력해 주세요.');
      flag = false;
    } else setDepartPlaceDetailErrorMsg('');
    if (infoPlace.arrivalPlaceDetail === '') {
      setArrivalPlaceDetailErrorMsg('도착지 세부정보를 입력해 주세요.');
      flag = false;
    } else setArrivalPlaceDetailErrorMsg('');
    if (/^[0-9]+$/.test(info.memberCount) === false && info.memberCount.length > 0) {
      setMemberCountErrorMsg('숫자로 입력해 주세요.');
      flag = false;
    } else setMemberCountErrorMsg('');
    return flag;
  };

  // 견적 삭제
  const deleteEstimate = () => {
    axios.delete(`/estimate/${estimateId}`)
    .then((response) => {})
    .catch((error) => {console.log(error)});
    alert("해당 견적을 삭제했습니다.");
    window.history.back();
  }

  // 견적 수정 모드 boolean
  const [modify, setModify] = useState(false);

  const handleClickModifyEstimate = () => {
    setOpenUpdate(false);
    setModify(!modify);
    if (modify === true && validate()) {
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
      axios.put(`/estimate/${estimateId}`, form)
      .then((response) => {
        alert("견적 요청 내용이 수정되었습니다.");
        window.location.reload();
      })
      .catch((error) => {console.log(error)});
    }
  };

  const handleClickDeleteEstimate = () => {
    setOpenDelete(true);
  };
  
  let currentDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  // 수정 요청용 데이터
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    travelType: "",
    vehicleType: "",
    vehicleNumber: "1",
    memberCount: "",
    departDate: new Date().toISOString().slice(0, 16),
    arrivalDate: new Date().toISOString().slice(0, 16),
    departPlace: "[서울]",
    arrivalPlace: "[서울]",
    memo: "",
    stopPlace: "",
    wayType: "",
    payment: "",
    taxBill: "",
  });
  // 서버로부터 받아온 견적요청 상세보기 데이터
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    travelType: "",
    vehicleType: "",
    vehicleNumber: "1",
    memberCount: "",
    departDate: new Date().toISOString().slice(0, 16),
    arrivalDate: new Date().toISOString().slice(0, 16),
    departPlace: "[서울]",
    arrivalPlace: "[서울]",
    memo: "",
    stopPlace: "",
    wayType: "",
    payment: "",
    taxBill: "",
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

  const inputNumber = (event) => {
    if (!/^[0-9]+$/.test(event.key) && event.key.length === 1) { event.preventDefault() };
  }

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handlePlaceChange = (e) => {
    const { name, value } = e.target;
    setInfoPlace({
      ...infoPlace,
      [name]: value,
    });
  }

  // 페이지 들어가면 데이터 서버로부터 가져온 데이터 세팅
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `이케이하나관광-견적상세내역`;

    if (!state) throw new Error('잘못된 접근입니다.');

    ektour
      .getEstimateDetailById(estimateId)
      .then((response) => {
        if(!response.hasOwnProperty('id')) navigate('/error');
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
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Box mb={3}>
        <Table
          stickyHeader
          size="small"
          sx={{
            width: "80%",
            m: "2em auto",
            minWidth: 600,
            verticalAlign: "middle",
          }}
        >
          <TableHead>
            <TableRow
              sx={{ "& th": { bgcolor: !modify ? "#fff4e5" : "#fdeded" } }}
            >
              <TableCell
                colSpan={2}
                color={modify ? "yellow" : "gray"}
                style={{ padding: "1em" }}
              >
                <Typography variant="h6">
                  <strong>
                    {modify ? "견적 요청 내역 수정" : "견적 상세 내용"}
                  </strong>
                </Typography>
              </TableCell>
              <TableCell colSpan={2} align="right">
                <Stack
                  direction={"row"}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  spacing={2}
                >
                  {
                    modify
                    ? <Button onClick={handleClickUpdateDialog} variant="contained">수정 완료/취소</Button>
                    : <Button onClick={handleClickModifyEstimate} variant="contained">수정</Button>
                  }
                  <Button
                    onClick={handleClickDeleteEstimate}
                    variant="contained"
                    color="error"
                  >
                    삭제
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "gray", color: "white" }}
                    href="javascript:window.history.back();"
                  >
                    뒤로
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Cell element="이름" type="label" />
              <Cell
                element={
                  <TextField
                    size="small"
                    InputProps={{ disabled: true }}
                    name="name"
                    value={info.name}
                    onChange={handleValueChange}
                    error={nameErrorMsg ? true : false}
                    helperText={nameErrorMsg}
                  />
                }
              />
              <Cell element="비밀번호" type="label" />
              <Cell
                element={
                  <TextField
                    size="small"
                    InputProps={{ disabled: true }}
                    inputProps={{ maxLength: 4 }}
                    name="password"
                    value={info.password}
                    type="text"
                    onChange={handleValueChange}
                    error={passwordErrorMsg ? true : false}
                    helperText={passwordErrorMsg}
                  />
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="연락처" type="label" />
              <Cell
                element={
                  <TextField
                    size="small"
                    InputProps={{ disabled: true }}
                    inputProps={{ maxLength: 11 }}
                    name="phone"
                    value={info.phone}
                    onChange={handleValueChange}
                    error={phoneErrorMsg ? true : false}
                    helperText={phoneErrorMsg}
                  />
                }
              />
              <Cell element="이메일" type="label" />
              <Cell
                element={
                  <TextField
                    size="small"
                    InputProps={{ readOnly: !modify }}
                    name="email"
                    value={info.email}
                    onChange={handleValueChange}
                    error={emailErrorMsg ? true : false}
                    helperText={emailErrorMsg}
                    
                  />
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="여행 구분" type="label" />
              <Cell
                element={
                  <Select
                    size="small"
                    disabled={!modify}
                    name="travelType"
                    value={info.travelType}
                    onChange={handleValueChange}
                  >
                    <MenuItem value="일반여행">일반여행</MenuItem>
                    <MenuItem value="관혼상제">관혼상제</MenuItem>
                    <MenuItem value="학교단체">학교단체</MenuItem>
                    <MenuItem value="기타단체">기타단체</MenuItem>
                  </Select>
                }
              />
              <Cell element="인원수" type="label" />
              <Cell
                element={
                  <OutlinedInput
                    type='text'
                    name='memberCount'
                    variant='outlined'
                    size='small'
                    value={info.memberCount}
                    onChange={handleValueChange}
                    onKeyDown={inputNumber}
                    endAdornment={<InputAdornment position='end'>명</InputAdornment>}
                    sx={{ width: '100px', margin: '0 auto' }}
                    inputProps={{ readOnly: !modify }}
                  />
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="차량 구분" type="label" />
              <Cell
                element={
                  <Select
                    size="small"
                    disabled={!modify}
                    name="vehicleType"
                    value={info.vehicleType}
                    onChange={handleValueChange}
                    error={vehicleTypeErrorMsg ? true : false}
                    helperText={vehicleTypeErrorMsg}
                  >
                    <MenuItem value="25인승 소형">25인승 소형</MenuItem>
                    <MenuItem value="28인승 리무진">28인승 리무진</MenuItem>
                    <MenuItem value="45인승 대형">45인승 대형</MenuItem>
                  </Select>
                }
              />
              <Cell element="차량 대수" type="label" />
              <Cell
                element={
                  <Select
                    size="small"
                    disabled={!modify}
                    name="vehicleNumber"
                    value={info.vehicleNumber}
                    onChange={handleValueChange}
                    error={vehicleNumberErrorMsg ? true : false}
                    helperText={vehicleNumberErrorMsg}
                  >
                    <MenuItem value="1">1대</MenuItem>
                    <MenuItem value="2">2대</MenuItem>
                    <MenuItem value="3">3대</MenuItem>
                    <MenuItem value="4">4대</MenuItem>
                    <MenuItem value="5">5대</MenuItem>
                    <MenuItem value="6">6대</MenuItem>
                    <MenuItem value="7">7대</MenuItem>
                    <MenuItem value="8">8대</MenuItem>
                    <MenuItem value="9">9대</MenuItem>
                    <MenuItem value="10">10대 이상</MenuItem>
                  </Select>
                }
              />
            </TableRow>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <Cell element="출발 일자" type="label" />
              <Cell
                element={
                  <Stack direction='row'>
                    <TextField
                      InputProps={{ readOnly: !modify }}
                      size="small"
                      type="date"
                      name="departDate"
                      value={infoPlace.departDate}
                      onChange={handlePlaceChange}
                      inputProps={{ min: currentDate }}
                    />
                    <Select size='small' name='departTime' onChange={handlePlaceChange} value={infoPlace.departTime}
                      MenuProps={{PaperProps: {sx: {maxHeight: 300}}}} disabled={!modify}>
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
                }
              />
              <Cell element="도착 일자" type="label" />
              <Cell
                element={
                  <Stack direction='row'>
                    <TextField
                      InputProps={{ readOnly: !modify }}
                      size="small"
                      type="date"
                      name="arrivalDate"
                      value={infoPlace.arrivalDate}
                      onChange={handlePlaceChange}
                      inputProps={{ min: currentDate }}
                    />
                    <Select size='small' name='arrivalTime' onChange={handlePlaceChange} value={infoPlace.arrivalTime}
                      MenuProps={{PaperProps: {sx: {maxHeight: 300}}}} disabled={!modify}>
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
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="출발 장소" type="label" />
              <Cell
                element={
                  <>
                    <Select
                      disabled={!modify}
                      size='small'
                      labelId='departPlace'
                      name='departPlace'
                      onChange={handlePlaceChange}
                      value={infoPlace.departPlace}>
                      <MenuItem value='[서울]'>서울</MenuItem>
                      <MenuItem value='[경기]'>경기</MenuItem>
                      <MenuItem value='[강원]'>강원</MenuItem>
                      <MenuItem value='[경북]'>경북</MenuItem>
                      <MenuItem value='[경남]'>경남</MenuItem>
                      <MenuItem value='[전북]'>전북</MenuItem>
                      <MenuItem value='[전남]'>전남</MenuItem>
                      <MenuItem value='[제주]'>제주</MenuItem>
                      <MenuItem value='[충북]'>충북</MenuItem>
                      <MenuItem value='[충남]'>충남</MenuItem>
                      <MenuItem value='[광주]'>광주</MenuItem>
                      <MenuItem value='[대구]'>대구</MenuItem>
                      <MenuItem value='[대전]'>대전</MenuItem>
                      <MenuItem value='[부산]'>부산</MenuItem>
                      <MenuItem value='[울산]'>울산</MenuItem>
                      <MenuItem value='[인천]'>인천</MenuItem>
                    </Select>
                    <TextField
                      InputProps={{ readOnly: !modify }}
                      size="small"
                      name="departPlaceDetail"
                      value={infoPlace.departPlaceDetail}
                      onChange={handlePlaceChange}
                      error={departPlaceDetailErrorMsg ? true : false}
                      helperText={departPlaceDetailErrorMsg}
                    />
                  </>
                }
              />
              <Cell element="도착 장소" type="label" />
              <Cell
                element={
                  <>
                    <Select
                      disabled={!modify}
                      size='small'
                      labelId='arrivalPlace'
                      name='arrivalPlace'
                      onChange={handlePlaceChange}
                      value={infoPlace.arrivalPlace}>
                      <MenuItem value='[서울]'>서울</MenuItem>
                      <MenuItem value='[경기]'>경기</MenuItem>
                      <MenuItem value='[강원]'>강원</MenuItem>
                      <MenuItem value='[경북]'>경북</MenuItem>
                      <MenuItem value='[경남]'>경남</MenuItem>
                      <MenuItem value='[전북]'>전북</MenuItem>
                      <MenuItem value='[전남]'>전남</MenuItem>
                      <MenuItem value='[제주]'>제주</MenuItem>
                      <MenuItem value='[충북]'>충북</MenuItem>
                      <MenuItem value='[충남]'>충남</MenuItem>
                      <MenuItem value='[광주]'>광주</MenuItem>
                      <MenuItem value='[대구]'>대구</MenuItem>
                      <MenuItem value='[대전]'>대전</MenuItem>
                      <MenuItem value='[부산]'>부산</MenuItem>
                      <MenuItem value='[울산]'>울산</MenuItem>
                      <MenuItem value='[인천]'>인천</MenuItem>
                    </Select>
                    <TextField
                      InputProps={{ readOnly: !modify }}
                      size="small"
                      name="arrivalPlaceDetail"
                      value={infoPlace.arrivalPlaceDetail}
                      onChange={handlePlaceChange}
                      error={arrivalPlaceDetailErrorMsg ? true : false}
                      helperText={arrivalPlaceDetailErrorMsg}
                    />
                  </>
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="경유지" type="label"/>
              <Cell element={
                <>
                <TextField
                type="text"
                name="stopPlace"
                variant="outlined"
                size="small"
                value={info.stopPlace}
                InputProps={{ readOnly: !modify }}
                onChange={handleValueChange}
                sx={{
                  width: "85%",
                }}
              />                
                </>
              }/>
              <Cell element="세금계산서" type="label"/>
              <Cell element={
                <>
                <RadioGroup row defaultValue={info.taxBill} onChange={handleValueChange}>
                <FormControlLabel
                  name="taxBill"
                  value="발급"
                  control={<Radio />}
                  label="발급"
                  disabled={!modify}
                  checked={info.taxBill === "발급"}
                />
                <FormControlLabel
                  name="taxBill"
                  value="발급안함"
                  control={<Radio />}
                  label="발급안함"
                  disabled={!modify}
                  checked={info.taxBill === "발급안함"}
                />
                </RadioGroup>
                </>
              }/>
            </TableRow>
            <TableRow>
              <Cell element="왕복구분" type="label"/>
              <Cell element={
                <>
                <RadioGroup row defaultValue={info.wayType} onChange={handleValueChange}>
                  <FormControlLabel
                    name="wayType"
                    value="왕복"
                    control={<Radio />}
                    label="왕복"
                    disabled={!modify}
                    checked={info.wayType === "왕복"}
                  />
                  <FormControlLabel
                    name="wayType"
                    value="편도"
                    control={<Radio />}
                    label="편도"
                    disabled={!modify}
                    checked={info.wayType === "편도"}
                  />
                </RadioGroup>
                </>
              }/>
              <Cell element="결제방법" type="label"/>
              <Cell element={
                <>
                <RadioGroup row defaultValue={info.payment} onChange={handleValueChange}>
                <FormControlLabel
                  name="payment"
                  value="현금"
                  control={<Radio />}
                  label="현금"
                  disabled={!modify}
                  checked={info.payment === "현금"}
                />
                <FormControlLabel
                  name="payment"
                  value="카드"
                  control={<Radio />}
                  label="카드"
                  disabled={!modify}
                  checked={info.payment === "카드"}
                />
                </RadioGroup>
                </>
              }/>
            </TableRow>
            <TableRow>
            <Cell element="기타 메모" type="label"/>
              <Cell colSpan={3} element={
                <>
                <TextField
                value={info.memo}
                type="text"
                name="memo"
                InputProps={{ readOnly: !modify }}
                variant="outlined"
                size="small"
                onChange={handleValueChange}
                sx={{
                  width: "85%",
                }}
              />                
                </>
              }/>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

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
            <Button onClick={deleteEstimate}>예</Button>
            <Button onClick={handleCloseDeleteDialog}>아니오</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* 수정 여부 묻는 다이얼로그 */}
      <Dialog open={openUpdate} onClose={handleCloseUpdateDialog}>
        <DialogContent>
          <Alert severity="warning">
            <AlertTitle>
              <strong style={{ fontSize: 18 }}>견적 요청 수정</strong>
            </AlertTitle>
            작성하진 정보를 반영하여 견적 요청을 수정합니다.
          </Alert>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClickModifyEstimate}>예</Button>
            <Button onClick={handleCloseUpdateDialog}>아니오</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
