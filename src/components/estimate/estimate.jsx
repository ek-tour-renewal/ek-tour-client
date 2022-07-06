import React, { useState, useRef } from "react";
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import Select from "@mui/material/Select";
import {
  MenuItem,
  TextField,
  Stack,
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
  Typography,
  FormLabel,
  Button,
  Box,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import styled from "@emotion/styled";
import Loading from "../../mobileComponents/Loading";

const Space = styled(Box)({
  marginTop: '22px',
});

const Estimate = (props) => {
  const buttonRef = useRef();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [estimateForm, setEstimateForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    travelType: "일반여행",
    vehicleType: "25인승 소형",
    vehicleNumber: "1",
    memberCount: "",
    departDate: new Date().toISOString().slice(0, 16),
    departTime: '',
    arrivalDate: new Date().toISOString().slice(0, 16),
    arrivalTime: '',
    departPlace: "[서울]",
    departPlaceDetail: "",
    arrivalPlace: "[서울]",
    arrivalPlaceDetail: "",
    memo: "",
    stopPlace: "",
    wayType: "왕복",
    payment: "현금",
    taxBill: "발급",
  });

  const openDetail = () => {
    console.log(estimateForm.arrivalDate);
    setVisible(!visible);
  };

  // 서버로 견적요청 post
  const onSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    if (validate()) {
      const data = {
        name: estimateForm.name,
        email: estimateForm.email,
        phone: estimateForm.phone,
        password: estimateForm.password,
        travelType: estimateForm.travelType,
        vehicleType: estimateForm.vehicleType,
        vehicleNumber: Number(estimateForm.vehicleNumber),
        memberCount: Number(estimateForm.memberCount),
        departDate: estimateForm.departDate,
        departPlace: estimateForm.departPlace + estimateForm.departPlaceDetail,
        arrivalDate: estimateForm.arrivalDate,
        arrivalPlace: estimateForm.arrivalPlace + estimateForm.arrivalPlaceDetail,
        memo: estimateForm.memo,
        stopPlace: estimateForm.stopPlace,
        wayType: estimateForm.wayType,
        payment: estimateForm.payment,
        taxBill: estimateForm.taxBill,
      };
      // console.log(data);
      axios.post("/estimate", data)
      .then((response) => {
        alert("견적을 요청했습니다.");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    } setLoading(false);
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setEstimateForm({ ...estimateForm, [name]: value, });
  };

  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const validate = () => {
    var flag = true;
    var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (estimateForm.name === "") {
      setNameErrorMsg("이름을 입력해주세요.");
      flag = false;
    } else setNameErrorMsg('');
    if (estimateForm.phone.includes("-")) {
      setPhoneErrorMsg(`'-' 빼고 숫자만 입력해주세요.`);
      flag = false;
    } else if (estimateForm.phone === "" || estimateForm.phone.length < 8) {
      setPhoneErrorMsg("연락처를 입력해 주세요.");
      flag = false;
    } else setPhoneErrorMsg('');
    if (regEmail.test(estimateForm.email) === false && estimateForm.email.length > 0) {
      setEmailErrorMsg("이메일 형식에 맞게 입력 해 주세요.");
      flag = false;
    } else setEmailErrorMsg('');
    if (estimateForm.password === "" || estimateForm.password.length < 4) {
      setPasswordErrorMsg("확인용 비밀번호 숫자 4자리를 입력해주세요.");
      flag = false;
    } else setPasswordErrorMsg('');
    return flag;
  };

  return (
    <Paper sx={{ m: '2em 0', borderRadius: '15px'}} elevation={10}>
      <Typography sx={{bgcolor: '#ec9f46', borderRadius: '15px 15px 0 0', color: 'white', fontWeight: 'bold'}} p={2} variant='h5'>
        실시간 견적 요청하기
      </Typography>
      
      <Stack sx={{ paddingTop: 4, paddingLeft: 4, paddingRight: 4 }}>
        <Stack direction='row' sx={{display: 'flex', justifyContent: 'space-evenly'}}>
          <TextField label="이름" type="text" name="name" size="small" autoComplete="off" onChange={handleValueChange} error={nameErrorMsg ? true : false} helperText={nameErrorMsg} />
          <TextField label="연락처" type="text" name="phone" size="small" autoComplete="off" onChange={handleValueChange} error={phoneErrorMsg ? true : false} helperText={phoneErrorMsg} inputProps={{ maxLength: 11 }} />
        </Stack>

        <Space />

        <Stack direction='row' sx={{display: 'flex', justifyContent: 'space-evenly'}}>
          <TextField label="이메일" type="email" name="email" size="small" autoComplete="off" onChange={handleValueChange} error={emailErrorMsg ? true : false} helperText={emailErrorMsg} />
          <TextField label="확인용 비밀번호" type="password" name="password" size="small" autoComplete="off" onChange={handleValueChange} error={passwordErrorMsg ? true : false} helperText={passwordErrorMsg} inputProps={{ maxLength: 4 }} />
        </Stack>

        <Space />

        <Stack direction='row' sx={{display: 'flex', justifyContent: 'center'}} spacing={3}>
          <Stack sx={{ width: '33%' }}>
            <Typography variant='caption' sx={{textAlign: 'left'}}>여행 구분</Typography>
            <Select labelId="travelType" name="travelType" onChange={handleValueChange} size="small" value={estimateForm.travelType}><MenuItem value={"일반여행"}>일반여행</MenuItem><MenuItem value={"관혼상제"}>관혼상제</MenuItem><MenuItem value={"학교단체"}>학교단체</MenuItem><MenuItem value={"기타단체"}>기타단체</MenuItem></Select>
          </Stack>
          <Stack sx={{ width: '33%' }}>
            <Typography variant='caption' sx={{textAlign: 'left'}}>차량 구분</Typography>
            <Select labelId="vehicleType" name="vehicleType" onChange={handleValueChange} size="small" value={estimateForm.vehicleType}><MenuItem value={"25인승 소형"}>25인승 소형</MenuItem><MenuItem value={"28인승 리무진"}>28인승 리무진</MenuItem><MenuItem value={"45인승 대형"}>45인승 대형</MenuItem></Select>
          </Stack>
          <Stack sx={{ width: '33%' }}>
            <Typography variant='caption' sx={{textAlign: 'left'}}>차량 대수</Typography>
            <Select value={estimateForm.vehicleNumber} onChange={handleValueChange} size="small" name="vehicleNumber"><MenuItem value="1">1대</MenuItem><MenuItem value="2">2대</MenuItem><MenuItem value="3">3대</MenuItem><MenuItem value="4">4대</MenuItem><MenuItem value="5">5대</MenuItem><MenuItem value="6">6대</MenuItem><MenuItem value="7">7대</MenuItem><MenuItem value="8">8대</MenuItem><MenuItem value="9">9대</MenuItem><MenuItem value="10">10대 이상</MenuItem></Select>
          </Stack>
        </Stack>
        
        <Space />

        <Box sx={{borderTop: '2px solid #eb9e44', borderBottom: '2px solid #eb9e44'}} p={2}>
        <Stack>
          <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 18 }} color='primary'>출발 계획</Typography>
          <Stack direction='row' justifyContent='center'><Typography variant="caption" color='gray'>&nbsp;&nbsp;출발 장소</Typography></Stack>
          <Stack direction='row' spacing={2}>
            <TextField size='small' label="출발일자" type="datetime-local" name="departDate" value={estimateForm.departDate} onChange={handleValueChange} />
            <Box>
              <Select size='small' labelId="departPlace" name="departPlace" onChange={handleValueChange} value={estimateForm.departPlace}><MenuItem value="[서울]">서울</MenuItem><MenuItem value="[경기]">경기</MenuItem><MenuItem value="[강원]">강원</MenuItem><MenuItem value="[경상]">경북</MenuItem><MenuItem value="[경상]">경남</MenuItem><MenuItem value="[전라]">전북</MenuItem><MenuItem value="[전라]">전남</MenuItem><MenuItem value="[제주]">제주</MenuItem><MenuItem value="[충청]">충북</MenuItem><MenuItem value="[충청]">충남</MenuItem><MenuItem value="[광주]">광주</MenuItem><MenuItem value="[대구]">대구</MenuItem><MenuItem value="[대전]">대전</MenuItem><MenuItem value="[부산]">부산</MenuItem><MenuItem value="[울산]">울산</MenuItem><MenuItem value="[인천]">인천</MenuItem></Select>
              <TextField size='small' label="출발지 세부정보" type="text" name="departPlaceDetail" autoComplete="off" onChange={handleValueChange} />
            </Box>
          </Stack>
        </Stack>

        <Box marginTop={2}>
          <ArrowDownwardOutlinedIcon sx={{ fontSize: 40, color: 'gray' }} />
        </Box>

        <Stack>
          <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 18 }} color='secondary'>귀행 계획</Typography>
          <Stack direction='row' justifyContent='center'><Typography variant="caption" color='gray'>&nbsp;&nbsp;귀행 장소</Typography></Stack>
          <Stack direction='row' spacing={2}>
            <TextField size='small' label="귀행일자" type="datetime-local" name="arrivalDate" onChange={handleValueChange} value={estimateForm.arrivalDate} />
            <Box>
              <Select size='small' labelId="arrivalPlace" name="arrivalPlace" onChange={handleValueChange} value={estimateForm.arrivalPlace}><MenuItem value="[서울]">서울</MenuItem><MenuItem value="[경기]">경기</MenuItem><MenuItem value="[강원]">강원</MenuItem><MenuItem value="[경상]">경북</MenuItem><MenuItem value="[경상]">경남</MenuItem><MenuItem value="[전라]">전북</MenuItem><MenuItem value="[전라]">전남</MenuItem><MenuItem value="[제주]">제주</MenuItem><MenuItem value="[충청]">충북</MenuItem><MenuItem value="[충청]">충남</MenuItem><MenuItem value="[광주]">광주</MenuItem><MenuItem value="[대구]">대구</MenuItem><MenuItem value="[대전]">대전</MenuItem><MenuItem value="[부산]">부산</MenuItem><MenuItem value="[울산]">울산</MenuItem><MenuItem value="[인천]">인천</MenuItem></Select>        
              <TextField size='small' label="도착지 세부정보" type="text" name="arrivalPlaceDetail" autoComplete="off" onChange={handleValueChange} />
            </Box>
          </Stack>
        </Stack>
        </Box>

        <Space />

        { visible && 
          (<>
            <TextField label="경유지" type="text" name="stopPlace" size="small" onChange={handleValueChange} multiline />
            
            <Space />

            <Box sx={{width: '100px', margin: '0 auto'}}>
            <Stack direction='row' justifyContent='flex-start'><Typography variant="caption" color='gray'>인원 수</Typography></Stack>
            <OutlinedInput type="tel" name="memberCount" variant="outlined" size="small" onChange={handleValueChange} endAdornment={<InputAdornment position="end">명</InputAdornment>} sx={{width: '100px'}} />
            </Box>

            <Space />

            <Stack direction='row' sx={{display: 'flex', justifyContent: 'space-evenly'}} spacing={3}>

              <Stack sx={{border: '1px solid lightgray', borderRadius: '10px', width: '33%'}} p={2}>
                <FormLabel sx={{textAlign: 'left'}}>왕복 구분</FormLabel>
                <RadioGroup value={estimateForm.wayType} onChange={handleValueChange}>
                  <FormControlLabel name="wayType" value="왕복" control={<Radio />} label="왕복" />
                  <FormControlLabel name="wayType" value="편도" control={<Radio />} label="편도" />
                </RadioGroup>
              </Stack>

              <Stack sx={{border: '1px solid lightgray', borderRadius: '10px', width: '33%'}} p={2}>
                <FormLabel sx={{textAlign: 'left'}}>결제 방식</FormLabel>
                <RadioGroup value={estimateForm.payment} onChange={handleValueChange}>
                  <FormControlLabel name="payment" value="현금" control={<Radio />} label="현금" />
                  <FormControlLabel name="payment" value="카드" control={<Radio />} label="카드" />
                </RadioGroup>
              </Stack>

              <Stack sx={{border: '1px solid lightgray', borderRadius: '10px', width: '33%'}} p={2}>
                <FormLabel sx={{textAlign: 'left'}}>세금 계산서</FormLabel>
                <RadioGroup value={estimateForm.taxBill} onChange={handleValueChange}>
                  <FormControlLabel name="taxBill" value="발급" control={<Radio />} label="발급" />
                  <FormControlLabel name="taxBill" value="발급안함" control={<Radio />} label="발급 안함" />
                </RadioGroup>
              </Stack>
            </Stack>

            <Space />

            <Space />

            <TextField label="기타 메모 사항" type="text" name="memo" onChange={handleValueChange} multiline minRows={3} autoComplete="off" />
          </>)
        }
        <Space />

        <Stack direction='row' sx={{display: 'flex', justifyContent: 'center'}}>
          <Button type="submit" onClick={onSubmit} variant='contained' size='large'
            style={{backgroundColor: '#5a4231', width: '50%'}}>
            <HistoryEduOutlinedIcon />
            &nbsp;견적 요청
          </Button>
        </Stack>

      </Stack>

      <Stack direction='row' sx={{display:'flex', justifyContent: 'flex-end'}}>
        <Button ref={buttonRef} onClick={openDetail} sx={{ width: '100px' }}>
          {visible ? (buttonRef.current.value = "간략요청") : "상세요청"}
        </Button>
      </Stack>

      <Loading open={loading} />

    </Paper>
  );
};

export default Estimate;
