import { Alert, AlertTitle, Box, Button, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Loading from '../Loading';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RequestForm() {

  const navigate = useNavigate();

  const defaultPhoneText = '핸드폰 번호는 - 없이 입력해주세요.';
  const defaultPwText = '비밀번호 4자리를 입력해주세요.';

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ phone: '', password: '' });
  const handleValueChange = (e) => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  }
  const [phoneErr, setPhoneErr] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [globalErr, setGlobalErr] = useState('');
  const validation = () => {
    var flag = true;
    if (form.phone.length < 1) {
      setPhoneErr('핸드폰 번호를 입력해주세요.');
      flag = false;
    }
    else if (form.phone.includes('-')) {
      setPhoneErr('- 빼고 입력해주세요.');
      flag = false
    }
    else setPhoneErr('');
    if (form.password.length < 4) {
      setPwErr('비밀번호 4자리를 입력해주세요.');
      flag = false
    }
    else setPwErr('');
    return flag;
  }

  const handleClickSubmit = () => {
    setLoading(true);
    if (validation()) {
      axios.post('/estimate/search/my', form)
      .then((response) => {
        if (response.data.length < 1) { // 핸드폰, 비밀번호 틀림
          setGlobalErr('핸드폰 번호 / 비밀번호를 다시 확인해주세요.');
        } else {
          // 검증 성공, location에 요청 form, response의 견적 목록 push
          navigate('/mobile/myestimate/list/1', { state: {
            form: { phone: form.phone, password: form.password },
            estimateList: response.data
          }});
        }
      })
      .catch((error) => { console.log(error.response); })
      .finally(() => { setLoading(false); });
    }
    setLoading(false);
  }
  
  return (
    <Box p={2} mt='20%'>
      {
        globalErr.length < 1
        ? <Alert icon={<SearchIcon />} severity='warning'><AlertTitle sx={{wordBreak: 'keep-all'}}><strong>요청한 견적을 확인합니다.</strong></AlertTitle><Typography variant='caption' component='div' sx={{wordBreak: 'keep-all'}}>견적 등록 시 입력한 핸드폰 번호와 비밀번호 4자리를 입력해 주세요.</Typography></Alert>
        : <Alert severity='error'><AlertTitle sx={{wordBreak: 'keep-all'}}><strong>요청한 견적을 확인합니다.</strong></AlertTitle><Typography variant='caption' component='div' sx={{wordBreak: 'keep-all'}}>핸드폰 번호와 비밀번호를 다시 확인해주세요.</Typography></Alert>
      }
      
      <Stack spacing={1} mt={2}>
        <Stack spacing={1}>
          <TextField size='small' type='tel' name='phone' inputProps={{ maxLength: 11 }} label='핸드폰 번호' value={form.phone} onChange={handleValueChange}
            helperText={phoneErr ? phoneErr : defaultPhoneText} error={phoneErr ? true : false} />
          <TextField size='small' type='password' name='password' inputProps={{ maxLength: 4 }} label='비밀번호' value={form.password} onChange={handleValueChange}
            helperText={pwErr ? pwErr : defaultPwText} error={pwErr ? true : false} />
        </Stack>
        <Stack direction='row' sx={{display: 'flex', justifyContent: 'center'}} spacing={1}>
          <Button variant='contained' style={{backgroundColor: '#5a4231'}} onClick={handleClickSubmit} type='submit'>확인</Button>
          <Button variant='outlined' style={{color: '#5a4231', borderColor: '#5a4231'}} href='javascript:history.back()'>취소</Button>
        </Stack>
      </Stack>

      { loading ? <Loading open={true} /> : <></> }
    </Box>
  );
}