import React, {useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getEstimateDetail, getMyEstimateList} from '../../api/estimate';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider, Grid,
  IconButton,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import {MY_NOTICE_MSG} from '../../const/myEstimate';
import SelectItem from '../common/Select';

export default function MyEstimateForm(props) {
  const navigate = useNavigate();
  const {page} = useParams();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(MY_NOTICE_MSG);

  const firstNumRef = useRef();
  const middleNumRef = useRef();
  const lastNumRef = useRef();
  const passwordRef = useRef();

  const handleCloseDialog = () => {
    props.onClose();
    firstNumRef.current.value = '';
    middleNumRef.current.value = '';
    lastNumRef.current.value = '';
    passwordRef.current.value = '';
    setMessage(MY_NOTICE_MSG);
  }

  // 나의 견적 확인 (내 정보 입력)
  const onSubmit = (e) => {
    e.preventDefault();
    let form = {
      phone: `${firstNumRef.current.value}${middleNumRef.current.value}${lastNumRef.current.value}`,
      password: passwordRef.current.value
    };

    if (form.phone.length < 11 || form.password.length !== 4) {
      setMessage('핸드폰 번호 / 비밀번호를 정확히 입력해주세요.');
      return;
    }

    if (props.estimateId) {
      setLoading(true);

      getEstimateDetail(form, props.estimateId)
        .then(() => {
          navigate(`/estimate/list/${page}/${props.estimateId}`, {
            state: {form}
          });
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setMessage('핸드폰 번호 / 비밀번호를 다시 확인해주세요.');
            console.log(error)
          } else {
            setMessage('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          }
        })
        .finally(() => setLoading(false))
    } else { // 내 견적 목록 확인
      getMyEstimateList(form)
        .then((response) => {
            if (!response.length) {
              setMessage('견적 요청 목록이 존재하지 않습니다.');
              return;
            }

            navigate('/estimate/my/list/1', {
              state: {
                form: form,
                estimateList: response
              }
            });
            handleCloseDialog();
          }
        )
        .catch((error) => console.log(error.response))
        .finally(() => setLoading(false))
    }
  }

  return (
    <Dialog open={props.open} onClose={handleCloseDialog}>
      <DialogTitle
        sx={{
          bgcolor: '#e7ebf0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant='h5'>
          {props.userName ? `${props.userName} 님의 요청 정보 확인하기` : '내 견적 요청 내역 확인하기'}
        </Typography>
        <IconButton onClick={handleCloseDialog}><CloseIcon/></IconButton>
      </DialogTitle>

      <Divider/>

      <DialogContent>
        {
          message !== MY_NOTICE_MSG
            ? <Alert severity='error'>{message}</Alert>
            : <Alert severity='info'>{MY_NOTICE_MSG}</Alert>
        }

        <form onSubmit={onSubmit}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Stack direction='column' spacing={2} sx={{width: '75%', m: 2}}>
              <Grid container>
                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography>핸드폰</Typography>
                </Grid>

                <Grid item xs={8}>
                  <Stack direction='row' spacing={1}>
                    <Select size='small' defaultValue={'010'} inputRef={firstNumRef}>
                      <SelectItem value='010'>010</SelectItem>
                      <SelectItem value='011'>011</SelectItem>
                      <SelectItem value='016'>016</SelectItem>
                      <SelectItem value='017'>017</SelectItem>
                      <SelectItem value='018'>018</SelectItem>
                      <SelectItem value='019'>019</SelectItem>
                    </Select>

                    <Typography variant='h5'>-</Typography>
                    <TextField
                      autoComplete='off'
                      size='small'
                      inputRef={middleNumRef}
                      inputProps={{maxLength: 4, type: 'tel'}}/>
                    <Typography variant='h5'>-</Typography>
                    <TextField
                      autoComplete='off'
                      size='small'
                      inputProps={{maxLength: 4, type: 'tel'}}
                      inputRef={lastNumRef}/>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography>비밀번호</Typography>
                </Grid>

                <Grid item xs={8}>
                  <TextField
                    autoComplete='off'
                    size='small'
                    inputRef={passwordRef}
                    inputProps={{maxLength: 4, type: 'password'}}
                    sx={{width: '100%'}}/>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            {
              loading
                ? <LoadingButton
                  type='submit'
                  variant='outlined'
                  loading={true}>
                  확인
                </LoadingButton>
                : <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={false}
                  style={{backgroundColor: '#5a4231'}}>
                  확인
                </LoadingButton>
            }
            <Box sx={{margin: '0 3px'}}/>
            <Button
              type='button'
              variant='outlined'
              style={{color: '#5a4231', borderColor: '#5a4231'}}
              onClick={handleCloseDialog}>
              취소
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

