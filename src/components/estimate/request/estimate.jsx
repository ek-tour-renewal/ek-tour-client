import React, {useState, useRef} from 'react';
import {
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
import styled from '@emotion/styled';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import Loading from '../../../mobileComponents/Loading';
import TimeSelect from "./TimeSelect";
import {VehicleNumSelect, VehicleSelect} from "./VehicleSelect";
import {TravelTypeSelect} from "./TravelTypeSelect";
import {PlaceSelect} from "./PlaceSelect";
import {createEstimate} from "../../../api/estimate";

const Space = styled(Box)({
  marginTop: '22px',
});

const Estimate = () => {
  let currentDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const travelTypeRef = useRef();
  const vehicleTypeRef = useRef();
  const vehicleNumberRef = useRef();
  const memberCountRef = useRef();
  const departDateRef = useRef();
  const departTimeRef = useRef();
  const arrivalDateRef = useRef();
  const arrivalTimeRef = useRef();
  const departPlaceRef = useRef();
  const departPlaceDetailRef = useRef();
  const arrivalPlaceRef = useRef();
  const arrivalPlaceDetailRef = useRef();
  const memoRef = useRef();
  const stopPlaceRef = useRef();
  const wayTypeRef = useRef();
  const paymentRef = useRef();
  const taxBillRef = useRef();

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
    let valid = true;
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (nameRef.current.value === '') {
      setNameErrorMsg('이름을 입력해주세요.');
      valid = false;
    } else setNameErrorMsg('');
    if (phoneRef.current.value.includes('-')) {
      setPhoneErrorMsg(`'-' 빼고 숫자만 입력해주세요.`);
      valid = false;
    } else if (phoneRef.current.value === '' || phoneRef.current.value.length < 8) {
      setPhoneErrorMsg('연락처를 입력해 주세요.');
      valid = false;
    } else setPhoneErrorMsg('');
    if (regEmail.test(emailRef.current.value) === false || !emailRef.current.value) {
      setEmailErrorMsg('이메일 형식에 맞게 입력 해 주세요.');
      valid = false;
    } else setEmailErrorMsg('');
    if (passwordRef.current.value === '' || passwordRef.current.value.length < 4) {
      setPasswordErrorMsg('숫자 4자리를 입력해주세요.');
      valid = false;
    } else setPasswordErrorMsg('');
    if (vehicleTypeRef.current.value === '') {
      setVehicleTypeErrorMsg('차량 종류를 선택해 주세요.');
      valid = false;
    } else setVehicleTypeErrorMsg('');
    if (vehicleNumberRef.current.value === '') {
      setVehicleNumberErrorMsg('차량 대수를 선택해 주세요.');
      valid = false;
    } else setVehicleNumberErrorMsg('');
    if (departPlaceDetailRef.current.value === '') {
      setDepartPlaceDetailErrorMsg('출발지 세부정보를 입력해 주세요.');
      valid = false;
    } else setDepartPlaceDetailErrorMsg('');
    if (arrivalPlaceDetailRef.current.value === '') {
      setArrivalPlaceDetailErrorMsg('도착지 세부정보를 입력해 주세요.');
      valid = false;
    } else setArrivalPlaceDetailErrorMsg('');
    if (!/^[0-9]+$/.test(memberCountRef.current.value) || memberCountRef.current.value.length <= 0) {
      setMemberCountErrorMsg('숫자로 입력해 주세요.');
      valid = false;
    } else setMemberCountErrorMsg('');
    return valid;
  };

  const resetEstimateInfo = () => {
    nameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
    passwordRef.current.value = '';
    travelTypeRef.current.value = '';
    vehicleTypeRef.current.value = '';
    vehicleNumberRef.current.value = '';
    memberCountRef.current.value = '';
    departDateRef.current.value = '';
    departTimeRef.current.value = '';
    departPlaceRef.current.value = '';
    departPlaceDetailRef.current.value = '';
    arrivalDateRef.current.value = '';
    arrivalTimeRef.current.value = '';
    arrivalPlaceRef.current.value = '';
    arrivalPlaceDetailRef.current.value = '';
    memoRef.current.value = '';
    stopPlaceRef.current.value = '';
    wayTypeRef.current.checked = true;
    paymentRef.current.checked = true;
    taxBillRef.current.checked = true;
  }

  const onEnterNumber = (event) => {
    if (!/^[0-9]+$/.test(event.key) && event.key.length === 1) {
      event.preventDefault()
    }
  };

  // 서버로 견적요청 post
  const onSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);
      const data = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        password: passwordRef.current.value,
        travelType: travelTypeRef.current.value,
        vehicleType: vehicleTypeRef.current.value,
        vehicleNumber: Number(vehicleNumberRef.current.value),
        memberCount: Number(memberCountRef.current.value),
        departDate: departDateRef.current.value + 'T' + departTimeRef.current.value,
        departPlace: departPlaceRef.current.value + departPlaceDetailRef.current.value,
        arrivalDate: arrivalDateRef.current.value + 'T' + arrivalTimeRef.current.value,
        arrivalPlace: arrivalPlaceRef.current.value + arrivalPlaceDetailRef.current.value,
        memo: memoRef.current.value,
        stopPlace: stopPlaceRef.current.value,
        wayType: wayTypeRef.current.checked ? '왕복' : '편도',
        payment: paymentRef.current.checked ? '현금' : '카드',
        taxBill: taxBillRef.current.checked ? '발급' : '발금안함'
      };

      await createEstimate(data)
        .then(() => {
          alert('견적을 요청했습니다.');
          resetEstimateInfo();
        })
        .catch((error) => {
          alert('견적을 요청할 수 없습니다. 고객센터로 문의해주세요.');
          console.log(error);
        })
        .finally(() => setLoading(false));
    } else {
      alert('정확한 정보를 입력해 주세요.');
    }
  };

  return (
    <Paper elevation={10} sx={{m: '2em 0', borderRadius: '15px'}}>
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

      <Stack sx={{p: 4, pb: 0}}>
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
            size='small'
            autoComplete='off'
            inputRef={nameRef}
            error={!!nameErrorMsg}
            helperText={nameErrorMsg}
          />
          <TextField
            label='연락처'
            required
            type='text'
            size='small'
            autoComplete='off'
            inputRef={phoneRef}
            error={!!phoneErrorMsg}
            helperText={phoneErrorMsg}
            inputProps={{maxLength: 11}}
            onKeyDown={onEnterNumber}
          />
        </Stack>

        <Space/>

        <Stack direction='row' sx={{display: 'flex', justifyContent: 'space-evenly'}}>
          <TextField
            label='이메일'
            type='email'
            size='small'
            autoComplete='off'
            inputRef={emailRef}
            error={!!emailErrorMsg} helperText={emailErrorMsg}
          />
          <TextField
            label='확인용 비밀번호'
            required
            type='password'
            inputMode='numeric'
            size='small'
            autoComplete='off'
            inputRef={passwordRef}
            error={!!passwordErrorMsg}
            helperText={passwordErrorMsg}
            inputProps={{maxLength: 4}}
            onKeyDown={onEnterNumber}
          />
        </Stack>

        <Space/>

        <Stack direction='row' spacing={3} sx={{display: 'flex', justifyContent: 'center'}}>
          <FormControl sx={{width: '33%'}}>
            <Typography variant='caption' sx={{textAlign: 'left'}}>여행 구분</Typography>
            <TravelTypeSelect name='travelType' inputRef={travelTypeRef}/>
          </FormControl>

          <FormControl sx={{m: 1, width: '33%'}} error={!!vehicleTypeErrorMsg}>
            <Typography variant='caption' sx={{textAlign: 'left'}}>차량 구분 *</Typography>
            <VehicleSelect name='vehicleType' inputRef={vehicleTypeRef}/>
            <FormHelperText>{vehicleTypeErrorMsg}</FormHelperText>
          </FormControl>

          <FormControl sx={{m: 1, width: '33%'}} error={!!vehicleNumberErrorMsg}>
            <Typography variant='caption' sx={{textAlign: 'left'}}>차량 대수 *</Typography>
            <VehicleNumSelect name='vehicleNumber' inputRef={vehicleNumberRef}/>
            <FormHelperText>{vehicleNumberErrorMsg}</FormHelperText>
          </FormControl>
        </Stack>

        <Space/>

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
              <Typography variant='caption' color='gray' sx={{width: '46%', textAlign: 'left'}}>출발 일자</Typography>
              <Typography variant='caption' color='gray'>출발 장소</Typography>
            </Stack>
            <Stack direction='row' spacing={2}>
              <Box>
                <TextField
                  size='small'
                  type='date'
                  inputProps={{min: currentDate}}
                  defaultValue={currentDate}
                  inputRef={departDateRef}
                />
                <TimeSelect inputRef={departTimeRef} name='departTime'/>

              </Box>
              <Box>
                <PlaceSelect name='departPlace' inputRef={departPlaceRef}/>
                <TextField
                  size='small'
                  label='출발지 세부정보'
                  type='text'
                  autoComplete='off'
                  inputRef={departPlaceDetailRef}
                  error={!!departPlaceDetailErrorMsg}
                  helperText={departPlaceDetailErrorMsg}
                />
              </Box>
            </Stack>
          </Stack>

          <Box mt={2}>
            <ArrowDownwardOutlinedIcon sx={{fontSize: 40, color: 'gray'}}/>
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
              <Typography variant='caption' color='gray' sx={{width: '46%', textAlign: 'left'}}>귀행 일자</Typography>
              <Typography variant='caption' color='gray'>귀행 장소</Typography>
            </Stack>
            <Stack direction='row' spacing={2}>
              <Box>
                <TextField
                  size='small'
                  type='date'
                  inputProps={{min: currentDate}}
                  inputRef={arrivalDateRef}
                  defaultValue={currentDate}
                />
                <TimeSelect inputRef={arrivalTimeRef} name='arrivalTime'/>

              </Box>
              <Box>
                <PlaceSelect name='arrivalPlace' inputRef={arrivalPlaceRef}/>
                <TextField
                  size='small'
                  label='도착지 세부정보'
                  type='text'
                  autoComplete='off'
                  inputRef={arrivalPlaceDetailRef}
                  error={!!arrivalPlaceDetailErrorMSg}
                  helperText={arrivalPlaceDetailErrorMSg}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Space/>

        <TextField
          label='경유지'
          type='text'
          size='small'
          inputRef={stopPlaceRef}
          multiline/>

        <Space/>

        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px', margin: '0 auto'}}>
          <Typography variant='caption' sx={{width: '100%', color: 'gray', textAlign: 'start'}}>인원수</Typography>
          <FormControl error={!!memberCountErrorMSg} sx={{mb: 1}}>
            <OutlinedInput
              type='text'
              variant='outlined'
              size='small'
              inputRef={memberCountRef}
              onKeyDown={onEnterNumber}
              endAdornment={<InputAdornment position='end'>명</InputAdornment>}
              sx={{wmargin: '0 auto'}}
            />
            <FormHelperText>{memberCountErrorMSg}</FormHelperText>
          </FormControl>
        </Box>

        <Space/>

        <Stack
          direction='row'
          spacing={3}
          sx={{display: 'flex', justifyContent: 'space-evenly'}}>

          <Stack sx={{border: '1px solid lightgray', borderRadius: '10px', width: '33%', p: 2}}>
            <FormLabel sx={{textAlign: 'left'}}>왕복 구분</FormLabel>
            <RadioGroup defaultValue={'왕복'}>
              <FormControlLabel
                name='wayType'
                value='왕복'
                control={<Radio inputRef={wayTypeRef}/>}
                label='왕복'
              />
              <FormControlLabel
                name='wayType'
                value='편도'
                control={<Radio/>}
                label='편도'
              />
            </RadioGroup>
          </Stack>

          <Stack sx={{border: '1px solid lightgray', borderRadius: '10px', width: '33%', p: 2}}>
            <FormLabel sx={{textAlign: 'left'}}>결제 방식</FormLabel>
            <RadioGroup defaultValue={'현금'}>
              <FormControlLabel
                value='현금'
                control={<Radio inputRef={paymentRef}/>}
                label='현금'
              />
              <FormControlLabel
                value='카드'
                control={<Radio/>}
                label='카드'
              />
            </RadioGroup>
          </Stack>

          <Stack sx={{border: '1px solid lightgray', borderRadius: '10px', width: '33%', p: 2}}>
            <FormLabel sx={{textAlign: 'left'}}>세금 계산서</FormLabel>
            <RadioGroup defaultValue={'발급'}>
              <FormControlLabel
                value='발급'
                control={<Radio inputRef={taxBillRef}/>}
                label='발급'
              />
              <FormControlLabel
                value='발급안함'
                control={<Radio/>}
                label='발급 안함'
              />
            </RadioGroup>
          </Stack>
        </Stack>

        <Space/>

        <Space/>

        <TextField
          label='기타 메모 사항'
          type='text'
          inputRef={memoRef}
          multiline
          minRows={3}
          autoComplete='off'
        />

        <Space/>

        <Stack direction='row' sx={{display: 'flex', justifyContent: 'center', mb: '30px'}}>
          <Button
            type='submit'
            onClick={onSubmit}
            variant='contained'
            size='large'
            style={{backgroundColor: '#5a4231', width: '50%'}}>
            <HistoryEduOutlinedIcon/>
            &nbsp;견적 요청
          </Button>
        </Stack>

      </Stack>

      <Loading open={loading}/>

    </Paper>
  );
};

export default Estimate;
