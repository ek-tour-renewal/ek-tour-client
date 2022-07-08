import React, { useState } from 'react';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import Select from '@mui/material/Select';
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
  FormHelperText,
  FormControl
} from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';
import Loading from '../../mobileComponents/Loading';

const Space = styled(Box)({
  marginTop: '22px',
});

const Estimate = (props) => {
  const [loading, setLoading] = useState(false);

  let currentDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  const [estimateForm, setEstimateForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    travelType: '',
    vehicleType: '',
    vehicleNumber: '',
    memberCount: '',
    departDate: currentDate,
    departTime: '05:00',
    arrivalDate: currentDate,
    arrivalTime: '05:00',
    departPlace: '[서울]',
    departPlaceDetail: '',
    arrivalPlace: '[서울]',
    arrivalPlaceDetail: '',
    memo: '',
    stopPlace: '',
    wayType: '',
    payment: '',
    taxBill: '',
  });

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
        departDate: estimateForm.departDate + 'T' + estimateForm.departTime,
        departPlace: estimateForm.departPlace + estimateForm.departPlaceDetail,
        arrivalDate: estimateForm.arrivalDate + 'T' + estimateForm.arrivalTime,
        arrivalPlace: estimateForm.arrivalPlace + estimateForm.arrivalPlaceDetail,
        memo: estimateForm.memo,
        stopPlace: estimateForm.stopPlace,
        wayType: estimateForm.wayType,
        payment: estimateForm.payment,
        taxBill: estimateForm.taxBill,
      };
      // console.log(data);
      axios.post('/estimate', data)
        .then((response) => {
          alert('견적을 요청했습니다.');
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          })
        .finally(() => {
          setLoading(false);
        });
    } else alert('정확한 정보를 입력해 주세요.');
    setLoading(false);
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setEstimateForm({ ...estimateForm, [name]: value, });
  };

  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [vehicleTypeErrorMsg, setVehicleTypeErrorMsg] = useState('');
  const [vehicleNumberErrorMsg, setVehicleNumberErrorMsg] = useState('');
  const [departPlaceDetailErrorMsg, setDepartPlaceDetailErrorMsg] = useState('');
  const [arrivalPlaceDetailErrorMSg, setArrivalPlaceDetailErrorMsg] = useState('');
  const [memberCountErrorMSg, setMemberCountErrorMsg] = useState('');

  const validate = () => {
    var flag = true;
    var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (estimateForm.name === '') {
      setNameErrorMsg('이름을 입력해주세요.');
      flag = false;
    } else setNameErrorMsg('');
    if (estimateForm.phone.includes('-')) {
      setPhoneErrorMsg(`'-' 빼고 숫자만 입력해주세요.`);
      flag = false;
    } else if (estimateForm.phone === '' || estimateForm.phone.length < 8) {
      setPhoneErrorMsg('연락처를 입력해 주세요.');
      flag = false;
    } else setPhoneErrorMsg('');
    if (regEmail.test(estimateForm.email) === false && estimateForm.email.length > 0) {
      setEmailErrorMsg('이메일 형식에 맞게 입력 해 주세요.');
      flag = false;
    } else setEmailErrorMsg('');
    if (estimateForm.password === '' || estimateForm.password.length < 4) {
      setPasswordErrorMsg('확인용 비밀번호 숫자 4자리를 입력해주세요.');
      flag = false;
    } else setPasswordErrorMsg('');
    if (estimateForm.vehicleType === '') {
      setVehicleTypeErrorMsg('차량 종류를 선택해 주세요.');
      flag = false;
    } else setVehicleTypeErrorMsg('');
    if (estimateForm.vehicleNumber === '') {
      setVehicleNumberErrorMsg('차량 대수를 선택해 주세요.');
      flag = false;
    } else setVehicleNumberErrorMsg('');
    if (estimateForm.departPlaceDetail === '') {
      setDepartPlaceDetailErrorMsg('출발지 세부정보를 입력해 주세요.');
      flag = false;
    } else setDepartPlaceDetailErrorMsg('');
    if (estimateForm.arrivalPlaceDetail === '') {
      setArrivalPlaceDetailErrorMsg('도착지 세부정보를 입력해 주세요.');
      flag = false;
    } else setArrivalPlaceDetailErrorMsg('');
    if (/^[0-9]+$/.test(estimateForm.memberCount) === false && estimateForm.memberCount.length > 0) {
      setMemberCountErrorMsg('숫자로 입력해 주세요.');
      flag = false;
    } else setMemberCountErrorMsg('');
    return flag;
  };

  const inputNumber = (event) => {
    if (!/^[0-9]+$/.test(event.key) && event.key.length === 1) { event.preventDefault() };
  }

  return (
    <Paper
      elevation={10}
      sx={{ m: '2em 0', borderRadius: '15px' }}
    >
      <Typography
        p={2}
        variant='h5'
        sx={{
          bgcolor: '#ec9f46',
          borderRadius: '15px 15px 0 0',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        실시간 견적 요청하기
      </Typography>

      <Stack sx={{ p: 4, pb: 0 }}>
        <Stack
          direction='row'
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly'
          }}>
          <TextField
            label='이름'
            required
            type='text'
            name='name'
            size='small'
            autoComplete='off'
            onChange={handleValueChange}
            error={nameErrorMsg ? true : false} helperText={nameErrorMsg}
          />
          <TextField
            label='연락처'
            required
            type='text'
            name='phone'
            size='small'
            autoComplete='off'
            onChange={handleValueChange}
            error={phoneErrorMsg ? true : false}
            helperText={phoneErrorMsg}
            inputProps={{ maxLength: 11 }}
            onKeyDown={ inputNumber }
          />
        </Stack>

        <Space />

        <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <TextField
            label='이메일'
            type='email'
            name='email'
            size='small'
            autoComplete='off'
            onChange={handleValueChange}
            error={emailErrorMsg ? true : false} helperText={emailErrorMsg}
          />
          <TextField
            label='확인용 비밀번호'
            required
            type='password'
            name='password'
            inputMode='numeric'
            size='small'
            autoComplete='off'
            onChange={handleValueChange}
            error={passwordErrorMsg ? true : false}
            helperText={passwordErrorMsg}
            inputProps={{ maxLength: 4 }}
            onKeyDown={ inputNumber }
          />
        </Stack>

        <Space />

        <Stack direction='row' spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={{ width: '33%' }}>
            <Typography variant='caption' sx={{ textAlign: 'left' }}>여행 구분</Typography>
            <Select
              labelId='travelType'
              name='travelType'
              onChange={handleValueChange}
              size='small'
              value={estimateForm.travelType}>
              <MenuItem value={'일반여행'}>일반여행</MenuItem>
              <MenuItem value={'관혼상제'}>관혼상제</MenuItem>
              <MenuItem value={'학교단체'}>학교단체</MenuItem>
              <MenuItem value={'기타단체'}>기타단체</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '33%' }} error={vehicleTypeErrorMsg ? true : false}>
            <Typography variant='caption' sx={{ textAlign: 'left' }}>차량 구분 *</Typography>
            <Select
              labelId='vehicleType'
              name='vehicleType'
              onChange={handleValueChange}
              size='small'
              value={estimateForm.vehicleType}
              >
              <MenuItem value={'25인승 소형'}>25인승 소형</MenuItem>
              <MenuItem value={'28인승 리무진'}>28인승 리무진</MenuItem>
              <MenuItem value={'45인승 대형'}>45인승 대형</MenuItem>
            </Select>
            <FormHelperText>{vehicleTypeErrorMsg}</FormHelperText>
          </FormControl>

          <FormControl sx={{ m: 1, width: '33%' }} error={vehicleNumberErrorMsg ? true : false}>
            <Typography variant='caption' sx={{ textAlign: 'left' }}>차량 대수 *</Typography>
            <Select
              value={estimateForm.vehicleNumber}
              onChange={handleValueChange}
              size='small' name='vehicleNumber'
              >
              <MenuItem value='1'>1대</MenuItem>
              <MenuItem value='2'>2대</MenuItem>
              <MenuItem value='3'>3대</MenuItem>
              <MenuItem value='4'>4대</MenuItem>
              <MenuItem value='5'>5대</MenuItem>
              <MenuItem value='6'>6대</MenuItem>
              <MenuItem value='7'>7대</MenuItem>
              <MenuItem value='8'>8대</MenuItem>
              <MenuItem value='9'>9대</MenuItem>
              <MenuItem value='10'>10대 이상</MenuItem>
            </Select>
            <FormHelperText>{vehicleNumberErrorMsg}</FormHelperText>
          </FormControl>
        </Stack>

        <Space />

        <Box
          sx={{
            borderTop: '2px solid #eb9e44',
            borderBottom: '2px solid #eb9e44',
            p: 2
          }}>
          <Stack>
            <Typography
              color='primary'
              sx={{
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 18
              }}>
              출발 계획
            </Typography>
            <Stack direction='row'>
              <Typography variant='caption' color='gray' sx={{width: '46%', textAlign:'left'}}>출발 일자</Typography>
              <Typography variant='caption' color='gray'>출발 장소</Typography>
            </Stack>
            <Stack direction='row' spacing={2}>
              <Box>
                <TextField
                  size='small'
                  type='date'
                  name='departDate'
                  inputProps={{ min: currentDate }}
                  value={estimateForm.departDate}
                  onChange={handleValueChange}
                />
                <Select size='small' name='departTime' onChange={handleValueChange} value={estimateForm.departTime}
                  MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}>
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
              </Box>
              <Box>
                <Select
                  size='small'
                  labelId='departPlace'
                  name='departPlace'
                  onChange={handleValueChange}
                  value={estimateForm.departPlace}>
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
                  size='small'
                  label='출발지 세부정보'
                  type='text'
                  name='departPlaceDetail'
                  autoComplete='off'
                  onChange={handleValueChange}
                  error={departPlaceDetailErrorMsg ? true : false}
                  helperText={departPlaceDetailErrorMsg}
                />
              </Box>
            </Stack>
          </Stack>

          <Box mt={2}>
            <ArrowDownwardOutlinedIcon sx={{ fontSize: 40, color: 'gray' }} />
          </Box>

          <Stack>
            <Typography
              color='secondary'
              sx={{
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 18
              }}
            >
              귀행 계획
            </Typography>
            <Stack direction='row'>
              <Typography variant='caption' color='gray' sx={{width: '46%', textAlign:'left'}}>귀행 일자</Typography>
              <Typography variant='caption' color='gray'>귀행 장소</Typography>
            </Stack>
            <Stack direction='row' spacing={2}>
              <Box>
                <TextField
                  size='small'
                  type='date'
                  name='arrivalDate'
                  inputProps={{ min: currentDate }}
                  onChange={handleValueChange}
                  value={estimateForm.arrivalDate}
                />
                <Select size='small' name='arrivalTime' onChange={handleValueChange} value={estimateForm.arrivalTime}
                  MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}>
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
              </Box>
              <Box>
                <Select
                  size='small'
                  labelId='arrivalPlace'
                  name='arrivalPlace'
                  onChange={handleValueChange}
                  value={estimateForm.arrivalPlace}>
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
                  size='small'
                  label='도착지 세부정보'
                  type='text'
                  name='arrivalPlaceDetail'
                  autoComplete='off'
                  onChange={handleValueChange}
                  error={arrivalPlaceDetailErrorMSg ? true : false}
                  helperText={arrivalPlaceDetailErrorMSg}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Space />

        <TextField
          label='경유지'
          type='text'
          name='stopPlace'
          size='small'
          onChange={handleValueChange}
          multiline />

        <Space />

        <Box sx={{ width: '200px', margin: '0 auto' }}>
          <Stack
            direction='row'
            justifyContent='flex-start'
            >
            <Typography variant='caption' color='gray' sx={{width: '135px'}}>인원수</Typography>
          </Stack>
          <FormControl sx={{ mb: 1 }} error={memberCountErrorMSg ? true : false}>
          <OutlinedInput
            type='text'
            name='memberCount'
            variant='outlined'
            size='small'
            onChange={handleValueChange}
            onKeyDown={inputNumber}
            endAdornment={<InputAdornment position='end'>명</InputAdornment>}
            sx={{ width: '100px', margin: '0 auto' }}
          />
          <FormHelperText>{memberCountErrorMSg}</FormHelperText>
          </FormControl>
        </Box>

        <Space />

        <Stack
          direction='row'
          spacing={3}
          sx={{ display: 'flex', justifyContent: 'space-evenly' }} >

          <Stack sx={{ border: '1px solid lightgray', borderRadius: '10px', width: '33%', p: 2 }}>
            <FormLabel sx={{ textAlign: 'left' }}>왕복 구분</FormLabel>
            <RadioGroup value={estimateForm.wayType} onChange={handleValueChange}>
              <FormControlLabel
                name='wayType'
                value='왕복'
                control={<Radio />}
                label='왕복'
              />
              <FormControlLabel
                name='wayType'
                value='편도'
                control={<Radio />}
                label='편도'
              />
            </RadioGroup>
          </Stack>

          <Stack sx={{ border: '1px solid lightgray', borderRadius: '10px', width: '33%', p: 2 }}>
            <FormLabel sx={{ textAlign: 'left' }}>결제 방식</FormLabel>
            <RadioGroup value={estimateForm.payment} onChange={handleValueChange}>
              <FormControlLabel
                name='payment'
                value='현금'
                control={<Radio />}
                label='현금'
              />
              <FormControlLabel
                name='payment'
                value='카드'
                control={<Radio />}
                label='카드'
              />
            </RadioGroup>
          </Stack>

          <Stack sx={{ border: '1px solid lightgray', borderRadius: '10px', width: '33%', p: 2 }}>
            <FormLabel sx={{ textAlign: 'left' }}>세금 계산서</FormLabel>
            <RadioGroup value={estimateForm.taxBill} onChange={handleValueChange}>
              <FormControlLabel
                name='taxBill'
                value='발급'
                control={<Radio />}
                label='발급'
              />
              <FormControlLabel
                name='taxBill'
                value='발급안함'
                control={<Radio />}
                label='발급 안함'
              />
            </RadioGroup>
          </Stack>
        </Stack>

        <Space />

        <Space />

        <TextField
          label='기타 메모 사항'
          type='text'
          name='memo'
          onChange={handleValueChange}
          multiline
          minRows={3}
          autoComplete='off'
        />
        <Space />

        <Stack direction='row' sx={{ display: 'flex', justifyContent: 'center', mb: '30px' }}>
          <Button
            type='submit'
            onClick={onSubmit}
            variant='contained'
            size='large'
            style={{ backgroundColor: '#5a4231', width: '50%' }}>
            <HistoryEduOutlinedIcon />
            &nbsp;견적 요청
          </Button>
        </Stack>

      </Stack>

      <Loading open={loading} />

    </Paper>
  );
};

export default Estimate;
