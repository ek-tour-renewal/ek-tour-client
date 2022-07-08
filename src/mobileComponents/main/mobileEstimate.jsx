import React, { useState, memo } from 'react';
import Select from '@mui/material/Select';
import {
  MenuItem,
  TextField,
  Box,
  Stack,
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
  Typography,
  Button,
  FormLabel,
  Container,
  Snackbar,
  Alert,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import axios from 'axios';
import Loading from '../Loading';

const MobileEstimate = memo((props) => {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const handleCloseSnackBar = () => { setSuccess(false); setFail(false); }

  let currentDateTime = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  const [estimateForm, setEstimateForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    travelType: '',
    vehicleType: '',
    vehicleNumber: '',
    memberCount: '',
    departDate: currentDateTime,
    arrivalDate: currentDateTime,
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
      axios.post('/estimate', data)
      .then((response) => {
        console.log(response.data);
        alert('견적을 요청했습니다.');
        window.location.reload();
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setFail(true);
      })
      .finally(() => {
        setLoading(false);
      });
    } else alert('정확한 정보를 입력해 주세요.');
    setLoading(false);
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setEstimateForm({
      ...estimateForm,
      [name]: value,
    });
  };

  const [nameErrorMsg, setNameErrorMsg] = useState(null);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [vehicleTypeErrorMsg, setVehicleTypeErrorMsg] = useState('');
  const [vehicleNumberErrorMsg, setVehicleNumberErrorMsg] = useState('');
  const [departPlaceDetailErrorMsg, setDepartPlaceDetailErrorMsg] = useState('');
  const [arrivalPlaceDetailErrorMSg, setArrivalPlaceDetailErrorMsg] = useState('');

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
    return flag;
  };

  return (
    <Paper
      elevation={10}
      sx={{
        width: '90%',
        m: 'auto',
        mt: '1em',
        p: '1em 0',
        backgroundColor: '#FFFACB',
        borderRadius: '20px'
      }} >
      <Typography
        sx={{
          width: '85%',
          p: '10px',
          m: 'auto',
          mb: '15px',
          borderRadius: '10px',
          backgroundColor: '#EC9F46',
          color: '#FCFCFC',
          textAlign: 'center'
        }}>
        실시간 견적요청
      </Typography >
      <form>
        <Box sx={{ display: 'inline-block', padding: '0 5px', textAlign: 'center' }}>
          <TextField
            label='이름'
            type='text'
            name='name'
            variant='outlined'
            size='small'
            value={estimateForm.name}
            // autoComplete='off'
            onChange={handleValueChange}
            error={nameErrorMsg ? true : false}
            helperText={nameErrorMsg}
            sx={{
              width: '45%',
              mb: '7px',
              mr: '2px',
              backgroundColor: '#FCFCFC'
            }}
          />
          <TextField
            label='연락처'
            type='tel'
            name='phone'
            variant='outlined'
            size='small'
            value={estimateForm.phone}
            // autoComplete='off'
            onChange={handleValueChange}
            error={phoneErrorMsg ? true : false}
            helperText={phoneErrorMsg}
            inputProps={{ maxLength: 11 }}
            sx={{
              width: '45%',
              mb: '7px',
              backgroundColor: '#FCFCFC'
            }}
          />
          <TextField
            label='확인용 비밀번호'
            type='password'
            name='password'
            variant='outlined'
            size='small'
            value={estimateForm.password}
            // autoComplete='off'
            onChange={handleValueChange}
            error={passwordErrorMsg ? true : false}
            helperText={passwordErrorMsg}
            inputProps={{ maxLength: 4 }}
            sx={{
              width: '45%',
              mb: '7px',
              mr: '2px',
              backgroundColor: '#FCFCFC'
            }}
          />
          <TextField
            label='이메일'
            type='email'
            name='email'
            variant='outlined'
            size='small'
            value={estimateForm.email}
            // autoComplete='off'
            onChange={handleValueChange}
            error={emailErrorMsg ? true : false}
            helperText={emailErrorMsg}
            sx={{
              width: '45%',
              mb: '15px',
              backgroundColor: '#FCFCFC'
            }}
          />
          <Box sx={{ width: '90%', m: '0 auto' }}>
            <TextField
              label='출발일자'
              type='datetime-local'
              name='departDate'
              InputLabelProps={{ shrink: true }}
              value={estimateForm.departDate}
              onChange={handleValueChange}
              inputProps={{ min: currentDateTime }}
              size='small'
              sx={{
                width: '100%',
                mb: '15px',
                backgroundColor: '#FCFCFC'
              }}
            />
            <TextField
              label='귀행일자'
              type='datetime-local'
              name='arrivalDate'
              InputLabelProps={{ shrink: true }}
              onChange={handleValueChange}
              value={estimateForm.arrivalDate}
              inputProps={{ min: currentDateTime }}
              size='small'
              sx={{
                width: '100%',
                mb: '15px',
                backgroundColor: '#FCFCFC'
              }}
            />
          </Box>

          <Stack
            direction='row'
            sx={{
              width: '90%',
              m: '0 auto',
              justifyContent: 'center',
              mb: '15px'
            }}>
            <Select
              labelId='departPlace'
              name='departPlace'
              onChange={handleValueChange}
              value={estimateForm.departPlace}
              size='small'
              sx={{ width: '30%', backgroundColor: '#FCFCFC' }}>
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
              label='출발지 세부정보'
              type='text'
              name='departPlaceDetail'
              variant='outlined'
              autoComplete='off'
              value={estimateForm.departPlaceDetail}
              size='small'
              sx={{
                ml: 1,
                width: '70%',
                backgroundColor: '#FCFCFC'
              }}
              onChange={handleValueChange}
              error={departPlaceDetailErrorMsg ? true : false}
                  helperText={departPlaceDetailErrorMsg}
            />
          </Stack>

          <Stack
            direction='row'
            sx={{
              width: '90%',
              m: '0 auto',
              justifyContent: 'center',
              mb: '15px'
            }}>
            <Select
              labelId='arrivalPlace'
              name='arrivalPlace'
              onChange={handleValueChange}
              value={estimateForm.arrivalPlace}
              size='small'
              sx={{ width: '30%', backgroundColor: '#FCFCFC' }}>
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
              label='도착지 세부정보'
              type='text'
              name='arrivalPlaceDetail'
              variant='outlined'
              autoComplete='off'
              size='small'
              sx={{
                ml: 1,
                width: '70%',
                backgroundColor: '#FCFCFC'
              }}
              onChange={handleValueChange}
              error={arrivalPlaceDetailErrorMSg ? true : false}
                  helperText={arrivalPlaceDetailErrorMSg}
            />
          </Stack>
          <TextField
            label='경유지'
            type='text'
            name='stopPlace'
            variant='outlined'
            size='small'
            onChange={handleValueChange}
            sx={{
              width: '90%',
              mb: '15px',
              backgroundColor: '#FCFCFC'
            }}
          />

          <Stack direction='row' sx={{ justifyContent: 'center', mb: '15px' }}>
          <FormControl sx={{width: '58%'}}>
              <InputLabel id='travelType'>여행구분</InputLabel>
            <Select
              labelId='travelType'
              input={<OutlinedInput label="여행구분" />}
              name='travelType'
              onChange={handleValueChange}
              size='small'
              value={estimateForm.travelType}
              sx={{ backgroundColor: '#FCFCFC' }}>
              <MenuItem value={'일반여행'}>일반여행</MenuItem>
              <MenuItem value={'관혼상제'}>관혼상제</MenuItem>
              <MenuItem value={'학교단체'}>학교단체</MenuItem>
              <MenuItem value={'기타단체'}>기타단체</MenuItem>
            </Select>
            </FormControl>

            <TextField
              label='인원'
              type='number'
              name='memberCount'
              variant='outlined'
              size='small'
              value={estimateForm.memberCount}
              onChange={handleValueChange}
              sx={{ width: '30%', ml: 1, backgroundColor: '#FCFCFC' }}
            />
          </Stack>
              <Stack direction='row' sx={{ justifyContent: 'center', mb: '15px' }}>
              <FormControl sx={{width: '45%'}} error={vehicleTypeErrorMsg ? true : false}>
              <InputLabel id='vehicleType'>차량구분</InputLabel>
                <Select
                  labelId='vehicleType'
                  input={<OutlinedInput label="차량구분" />}
                  name='vehicleType'
                  onChange={handleValueChange}
                  size='small'
                  value={estimateForm.vehicleType}
                  sx={{ backgroundColor: '#FCFCFC' }}
                >
                  <MenuItem value={'25인승 소형'}>25인승 소형</MenuItem>
                  <MenuItem value={'28인승 리무진'}>28인승 리무진</MenuItem>
                  <MenuItem value={'45인승 대형'}>45인승 대형</MenuItem>
                </Select>
                <FormHelperText>{vehicleTypeErrorMsg}</FormHelperText>
                </FormControl>
                
                <FormControl sx={{width: '45%'}} error={vehicleNumberErrorMsg ? true : false}>
              <InputLabel id='vehicleNumber'>차량대수</InputLabel>
                <Select
                labelId='vehicleNumber'
                input={<OutlinedInput label="차량대수" />}
                  value={estimateForm.vehicleNumber}
                  onChange={handleValueChange}
                  size='small'
                  name='vehicleNumber'
                  sx={{ ml: 1, backgroundColor: '#FCFCFC' }}>
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

              <Container>
                <Stack
                  direction='row'
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    mb: '5px'
                  }}>
                  <Stack
                    sx={{
                      width: '100%',
                      backgroundColor: '#FCFCFC',
                      border: '1px solid lightgrey',
                      borderRadius: '10px',
                      p: 1,
                      pr: 0,
                      mb: 1
                    }}>
                    <FormLabel>왕복 구분</FormLabel>
                    <RadioGroup
                      row
                      value={estimateForm.wayType}
                      onChange={handleValueChange}
                      sx={{ justifyContent: 'center' }}>
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

                  <Stack
                    sx={{
                      width: '100%',
                      backgroundColor: '#FCFCFC',
                      border: '1px solid lightgrey',
                      borderRadius: '10px',
                      p: 1,
                      pr: 0,
                      mb: 1
                    }}>
                    <FormLabel>결제 방법</FormLabel>
                    <RadioGroup
                      row
                      value={estimateForm.payment}
                      onChange={handleValueChange}
                      sx={{ justifyContent: 'center' }}>
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

                  <Stack
                    sx={{
                      width: '100%',
                      backgroundColor: '#FCFCFC',
                      border: '1px solid lightgrey',
                      borderRadius: '10px',
                      p: 1,
                      pr: 0,
                      mb: 2
                    }}>
                    <FormLabel>세금 계산서</FormLabel>
                    <RadioGroup
                      row
                      value={estimateForm.taxBill}
                      onChange={handleValueChange}
                      sx={{ justifyContent: 'center' }}>
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
                        label='발급 안 함'
                      />
                    </RadioGroup>
                  </Stack>
                </Stack>
              </Container>
              <TextField
                label='기타 메모 사항'
                type='text'
                name='memo'
                variant='outlined'
                onChange={handleValueChange}
                value={estimateForm.memo}
                multiline
                minRows={1}
                autoComplete='off'
                sx={{ width: '90%', mb: '15px', backgroundColor: '#FCFCFC' }}
              />
            </Box>
        {/* 견적요청 버튼 */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            type='submit'
            onClick={onSubmit}
            style={{
              backgroundColor: '#5A4231',
              color: '#FCFCFC',
              padding: '5px 10px',
              borderRadius: '10px'
            }}>
            견적요청
          </Button>
        </Box>
      </form>

      <Loading open={loading} />

      <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="success" sx={{ width: '100%' }}>
          작성하신 견적을 요청했습니다.
        </Alert>
      </Snackbar>

      <Snackbar open={fail} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="error" sx={{ width: '100%' }}>
          오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </Alert>
      </Snackbar>
    </Paper>
  )
});

export default MobileEstimate;