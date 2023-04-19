import {Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function ModifyHeader(props) {
  const navigate = useNavigate();

  return (
    <Stack
      direction={'row'}
      sx={{
        m: '0 auto',
        minWidth: 600,
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: !props.modify ? '#fff4e5' : '#fdeded',
        borderBottom: '1px solid rgb(224, 224, 224)'
      }}
    >
      <Typography variant='h6' sx={{p: '0.7em', fontWeight: 'bold'}}>
        {props.modify ? '견적 요청 내역 수정' : '견적 상세 내용'}
      </Typography>

      <Stack
        direction={'row'}
        spacing={2}
        sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: '0.7em'}}
      >
        {
          props.modify
            ? <Button onClick={props.openModify} variant='contained'>수정 완료/취소</Button>
            : <Button onClick={props.modifyMyEstimate} variant='contained'>수정</Button>
        }
        <Button
          onClick={props.openDelete}
          variant='contained'
          color='error'
        >
          삭제
        </Button>
        <Button
          variant='contained'
          sx={{backgroundColor: 'gray', color: 'white'}}
          onClick={() => navigate(-1)}
        >
          뒤로
        </Button>
      </Stack>
    </Stack>
  )
}