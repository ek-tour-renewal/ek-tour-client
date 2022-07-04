import React, { useState, useRef } from 'react';
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
} from '@mui/material';
import axios from 'axios';
import { Container, width } from '@mui/system';

const MobileEstimate = (props) => {
  const buttonRef = useRef();
  const [visible, setVisible] = useState(false);

  const [estimateForm, setEstimateForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    travelType: '일반여행',
    vehicleType: '25인승 소형',
    vehicleNumber: '1',
    memberCount: '',
    departDate: new Date().toISOString().slice(0, 16),
    arrivalDate: new Date().toISOString().slice(0, 16),
    departPlace: '[서울]',
    departPlaceDetail: '',
    arrivalPlace: '[서울]',
    arrivalPlaceDetail: '',
    memo: '',
    stopPlace: '',
    wayType: '왕복',
    payment: '현금',
    taxBill: false,
  });

  const openDetail = () => {
    setVisible(!visible);
  };

  // 세금계산서 true, false 변환
  const convertBool = (str) => {
    if (str == 'true') return true;
    else return false;
  };

  // 서버로 견적요청 post
  const onSubmit = (event) => {
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
        arrivalPlace:
          estimateForm.arrivalPlace + estimateForm.arrivalPlaceDetail,
        memo: estimateForm.memo,
        stopPlace: estimateForm.stopPlace,
        wayType: estimateForm.wayType,
        payment: estimateForm.payment,
        taxBill: convertBool(estimateForm.taxBill),
      };
      // console.log(data);
      axios
        .post('/estimate', data)
        .then((response) => {
          alert('견적을 요청했습니다.');
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  const resetErrorMsg = () => {
    setNameErrorMsg(null);
    setPhoneErrorMsg(null);
    setEmailErrorMsg(null);
    setPasswordErrorMsg(null);
  };

  const validate = () => {
    var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (estimateForm.name === '') {
      setNameErrorMsg('이름을 입력해주세요.');
      return false;
    }
    if (estimateForm.phone.includes('-')) {
      setPhoneErrorMsg(`'-' 빼고 숫자만 입력해주세요.`);
      return false;
    } else if (estimateForm.phone === '' || estimateForm.phone.length < 8) {
      setPhoneErrorMsg('연락처를 입력해 주세요.');
      return false;
    }
    if (estimateForm.email === '' | regEmail.test(estimateForm.email) === false) {
      setEmailErrorMsg('이메일을 입력해 주세요.');
      return false;
    }
    if (estimateForm.password === '' || estimateForm.password.length < 4) {
      setPasswordErrorMsg('확인용 비밀번호 4자리를 입력해주세요.');
      return false;
    }
    resetErrorMsg();
    return true;
  };

  return (
    <Paper
      elevation={10}
      sx={{
        width: '90%',
        m: 'auto',
        mt: '2em',
        p: '1em 0',
        borderRadius: '20px'
      }} >
      <Typography
        sx={{
          width: 'max-content',
          p: '10px',
          m: 'auto',
          mb: '15px',
          borderRadius: '10px',
          backgroundColor: '#EC9F46',
          color: '#FCFCFC'
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
            autoComplete='off'
            onChange={handleValueChange}
            error={nameErrorMsg ? true : false}
            helperText={nameErrorMsg}
            sx={{
              width: '45%',
              mb: '7px',
              mr: '2px'
            }}
          />
          <TextField
            label='연락처'
            type='text'
            name='phone'
            variant='outlined'
            size='small'
            autoComplete='off'
            onChange={handleValueChange}
            error={phoneErrorMsg ? true : false}
            helperText={phoneErrorMsg}
            inputProps={{ maxLength: 11 }}
            sx={{
              width: '45%',
              mb: '7px'
            }}
          />
          <TextField
            label='확인용 비밀번호'
            type='password'
            name='password'
            variant='outlined'
            size='small'
            autoComplete='off'
            onChange={handleValueChange}
            error={passwordErrorMsg ? true : false}
            helperText={passwordErrorMsg}
            inputProps={{ maxLength: 4 }}
            sx={{
              width: '45%',
              mb: '7px',
              mr: '2px'
            }}
          />
          <TextField
            label='이메일'
            type='email'
            name='email'
            variant='outlined'
            size='small'
            autoComplete='off'
            onChange={handleValueChange}
            error={emailErrorMsg ? true : false}
            helperText={emailErrorMsg}
            sx={{
              width: '45%',
              mb: '15px'
            }}
          />
          <Box sx={{width: '90%', m: '0 auto'}}>
            <TextField
              label='출발일자'
              type='datetime-local'
              name='departDate'
              InputLabelProps={{ shrink: true }}
              value={estimateForm.departDate}
              onChange={handleValueChange}
              size='small'
              sx={{
                width: '100%',
                mb: '15px'
              }}
            />
            <TextField
              label='귀행일자'
              type='datetime-local'
              name='arrivalDate'
              InputLabelProps={{ shrink: true }}
              onChange={handleValueChange}
              value={estimateForm.arrivalDate}
              size='small'
              sx={{
                width: '100%',
                mb: '15px'
              }}
            />
          </Box>

          <Stack direction='row' sx={{ width: '90%', m: '0 auto', justifyContent: 'center', mb: '15px' }}>
            <Select
              labelId='departPlace'
              name='departPlace'
              onChange={handleValueChange}
              value={estimateForm.departPlace}
              defaultValue={estimateForm.departPlace}
              size='small'
              sx={{ width: '30%' }}>
              <MenuItem value='[서울]'>서울</MenuItem>
              <MenuItem value='[경기]'>경기</MenuItem>
              <MenuItem value='[강원]'>강원</MenuItem>
              <MenuItem value='[경상]'>경북</MenuItem>
              <MenuItem value='[경상]'>경남</MenuItem>
              <MenuItem value='[전라]'>전북</MenuItem>
              <MenuItem value='[전라]'>전남</MenuItem>
              <MenuItem value='[제주]'>제주</MenuItem>
              <MenuItem value='[충청]'>충북</MenuItem>
              <MenuItem value='[충청]'>충남</MenuItem>
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
              size='small'
              sx={{
                ml: 1,
                width: '70%'
              }}
              onChange={handleValueChange}
            />
          </Stack>

          <Stack direction='row' sx={{ width: '90%', m: '0 auto', justifyContent: 'center', mb: '15px' }}>
            <Select
              labelId='arrivalPlace'
              name='arrivalPlace'
              onChange={handleValueChange}
              value={estimateForm.arrivalPlace}
              defaultValue={estimateForm.arrivalPlace}
              size='small'
              sx={{ width: '30%' }}>
              <MenuItem value='[서울]'>서울</MenuItem>
              <MenuItem value='[경기]'>경기</MenuItem>
              <MenuItem value='[강원]'>강원</MenuItem>
              <MenuItem value='[경상]'>경북</MenuItem>
              <MenuItem value='[경상]'>경남</MenuItem>
              <MenuItem value='[전라]'>전북</MenuItem>
              <MenuItem value='[전라]'>전남</MenuItem>
              <MenuItem value='[제주]'>제주</MenuItem>
              <MenuItem value='[충청]'>충북</MenuItem>
              <MenuItem value='[충청]'>충남</MenuItem>
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
                width: '70%'
              }}
              onChange={handleValueChange}
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
              mb: '15px'
            }}
          />

          <Stack direction='row' sx={{ justifyContent: 'center', mb: '15px' }}>
            <Select
              labelId='travelType'
              name='travelType'
              onChange={handleValueChange}
              size='small'
              value={estimateForm.travelType}
              defaultValue={estimateForm.travelType}
              sx={{ width: '58%' }}>
              <MenuItem value={'일반여행'}>일반여행</MenuItem>
              <MenuItem value={'관혼상제'}>관혼상제</MenuItem>
              <MenuItem value={'학교단체'}>학교단체</MenuItem>
              <MenuItem value={'기타단체'}>기타단체</MenuItem>
            </Select>

            <TextField
              label='인원'
              type='number'
              name='memberCount'
              variant='outlined'
              size='small'
              onChange={handleValueChange}
              sx={{ width: '30%', ml: 1 }}
            />
          </Stack>

        </Box>

        {visible && (
          <Box sx={{ display: 'block', padding: '0 5px', textAlign: 'center' }}>
            <Stack direction='row' sx={{ justifyContent: 'center', mb: '15px' }}>
              <Select
                labelId='vehicleType'
                name='vehicleType'
                onChange={handleValueChange}
                size='small'
                value={estimateForm.vehicleType}
                defaultValue={estimateForm.vehicleType}
                sx={{ width: '50%' }}
              >
                <MenuItem value={'25인승 소형'}>25인승 소형</MenuItem>
                <MenuItem value={'28인승 리무진'}>28인승 리무진</MenuItem>
                <MenuItem value={'45인승 대형'}>45인승 대형</MenuItem>
              </Select>
              <Select
                value={estimateForm.vehicleNumber}
                defaultValue={estimateForm.vehicleNumber}
                onChange={handleValueChange}
                size='small'
                name='vehicleNumber'
                sx={{ ml: 1, width: '38%' }}>
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
            </Stack>
            <Stack 
            direction='row' 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
               mb: '5px' 
               }}>
              <RadioGroup row defaultValue='왕복' onChange={handleValueChange}>
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
              <RadioGroup row defaultValue='현금' onChange={handleValueChange}>
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
              <RadioGroup
              row
              defaultValue={true}
              onChange={handleValueChange}>
              <FormControlLabel
                name='taxBill'
                value={true}
                control={<Radio />}
                label='세금계산서 발급'
              />
              <FormControlLabel
                name='taxBill'
                value={false}
                control={<Radio />}
                label='발급안함'
              />
            </RadioGroup>
            </Stack>
            <TextField
              label='기타 메모 사항'
              type='text'
              name='memo'
              variant='outlined'
              onChange={handleValueChange}
              multiline
              minRows={1}
              autoComplete='off'
              sx={{ width: '90%', mb: '15px' }}
            />
          </Box>
        )}
        {/* 견적요청 버튼 */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            type='submit'
            onClick={onSubmit}
            sx={{
              backgroundColor: '#5A4231',
              color: '#FCFCFC',
              padding: '5px 10px',
              borderRadius: '10px'
            }}>
            견적요청
          </Button>
        </Box>
        <Box
          sx={{ textAlign: 'end', mr: 1 }}>
          <Button
            type='button'
            ref={buttonRef}
            onClick={openDetail}
            sx={{ color: '#5A4231' }}>
            {visible ? (buttonRef.current.value = '간략요청') : '상세요청'}
          </Button>
        </Box>
      </form>
    </Paper>
  )
};

export default MobileEstimate;