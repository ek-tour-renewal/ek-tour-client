import React from "react";
import {
  Grid,
  Stack,
  Typography,
  TextField,
  Select,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import styled from "@emotion/styled";
import SelectItem from "../../common/Select";

export default function ModifyForm(props) {
  const {data, place, modify, errorMsg, modifyEstimateData, modifyPlaceData} = props;

  let currentDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  const inputNumber = (event) => {
    if (!/^[0-9]+$/.test(event.key) && event.key.length === 1) {
      event.preventDefault()
    }
  }

  return (
    <Stack>
      <GridContainer container>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>이름</Label>
          </Grid>
          <InputGrid item xs={9}>
            <TextField
              size='small'
              InputProps={{disabled: true}}
              value={data.name}
            />
          </InputGrid>
        </Grid>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>비밀번호</Label>
          </Grid>
          <InputGrid item xs={9}>
            <TextField
              size='small'
              InputProps={{disabled: true}}
              value={data.password}
            />
          </InputGrid>
        </Grid>
      </GridContainer>

      <GridContainer container>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>연락처</Label>
          </Grid>
          <InputGrid item xs={9}>
            <TextField
              size='small'
              InputProps={{disabled: true}}
              value={data.phone}
            />
          </InputGrid>
        </Grid>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>이메일</Label>
          </Grid>
          <InputGrid item xs={9}>
            <TextField
              type='email'
              name='email'
              size='small'
              onChange={modifyEstimateData}
              InputProps={{disabled: !modify}}
              value={data.email}
              error={!!errorMsg.email}
              helperText={errorMsg.email}
            />
          </InputGrid>
        </Grid>
      </GridContainer>

      <GridContainer container>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>여행구분</Label>
          </Grid>
          <InputGrid item xs={9}>
            <Select
              size='small'
              disabled={!modify}
              value={data.travelType}
              name='travelType'
              onChange={modifyEstimateData}
            >
              <SelectItem value='일반여행'>일반여행</SelectItem>
              <SelectItem value='관혼상제'>관혼상제</SelectItem>
              <SelectItem value='학교단체'>학교단체</SelectItem>
              <SelectItem value='기타단체'>기타단체</SelectItem>
            </Select>
          </InputGrid>
        </Grid>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>인원수</Label>
          </Grid>
          <InputGrid item xs={9}>
            <FormControl error={!!errorMsg.memberCount}>
              <OutlinedInput
                type='text'
                name='memberCount'
                variant='outlined'
                size='small'
                value={data.memberCount}
                inputProps={{readOnly: !modify}}
                onChange={modifyEstimateData}
                onKeyDown={inputNumber}
                endAdornment={<InputAdornment position='end'>명</InputAdornment>}
                sx={{width: '100px'}}
              />
              <FormHelperText>{errorMsg.memberCount}</FormHelperText>
            </FormControl>
          </InputGrid>
        </Grid>
      </GridContainer>

      <GridContainer container>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>차량 구분</Label>
          </Grid>
          <InputGrid item xs={9}>
            <Select
              name='vehicleType'
              size='small'
              disabled={!modify}
              value={data.vehicleType}
              onChange={modifyEstimateData}
            >
              <SelectItem value='25인승 소형'>25인승 소형</SelectItem>
              <SelectItem value='28인승 리무진'>28인승 리무진</SelectItem>
              <SelectItem value='45인승 대형'>45인승 대형</SelectItem>
            </Select>
          </InputGrid>
        </Grid>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>차량 대수</Label>
          </Grid>
          <InputGrid item xs={9}>
            <Select
              name='vehicleNumber'
              size='small'
              disabled={!modify}
              value={data.vehicleNumber}
              onChange={modifyEstimateData}
            >
              <SelectItem value='1'>1대</SelectItem>
              <SelectItem value='2'>2대</SelectItem>
              <SelectItem value='3'>3대</SelectItem>
              <SelectItem value='4'>4대</SelectItem>
              <SelectItem value='5'>5대</SelectItem>
              <SelectItem value='6'>6대</SelectItem>
              <SelectItem value='7'>7대</SelectItem>
              <SelectItem value='8'>8대</SelectItem>
              <SelectItem value='9'>9대</SelectItem>
              <SelectItem value='10'>10대 이상</SelectItem>
            </Select>
          </InputGrid>
        </Grid>
      </GridContainer>

      <GridContainer container>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>출발 일자</Label>
          </Grid>
          <InputGrid item xs={9}>
            <Stack direction='row' spacing={1}>
              <TextField
                name='departDate'
                size='small'
                type='date'
                value={place.departDate}
                InputProps={{disabled: !modify}}
                inputProps={{min: currentDate}}
                onChange={modifyPlaceData}
              />
              <Select
                name='departTime'
                size='small'
                value={place.departTime}
                disabled={!modify}
                MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                onChange={modifyPlaceData}
              >
                <SelectItem value='05:00'>05:00</SelectItem><SelectItem value='05:30'>05:30</SelectItem>
                <SelectItem value='06:00'>06:00</SelectItem><SelectItem value='06:30'>06:30</SelectItem>
                <SelectItem value='07:00'>07:00</SelectItem><SelectItem value='07:30'>07:30</SelectItem>
                <SelectItem value='08:00'>08:00</SelectItem><SelectItem value='08:30'>08:30</SelectItem>
                <SelectItem value='09:00'>09:00</SelectItem><SelectItem value='09:30'>09:30</SelectItem>
                <SelectItem value='10:00'>10:00</SelectItem><SelectItem value='10:30'>10:30</SelectItem>
                <SelectItem value='11:00'>11:00</SelectItem><SelectItem value='11:30'>11:30</SelectItem>
                <SelectItem value='12:00'>12:00</SelectItem><SelectItem value='12:30'>12:30</SelectItem>
                <SelectItem value='13:00'>13:00</SelectItem><SelectItem value='13:30'>13:30</SelectItem>
                <SelectItem value='14:00'>14:00</SelectItem><SelectItem value='14:30'>14:30</SelectItem>
                <SelectItem value='15:00'>15:00</SelectItem><SelectItem value='15:30'>15:30</SelectItem>
                <SelectItem value='16:00'>16:00</SelectItem><SelectItem value='16:30'>16:30</SelectItem>
                <SelectItem value='17:00'>17:00</SelectItem><SelectItem value='17:30'>17:30</SelectItem>
                <SelectItem value='18:00'>18:00</SelectItem><SelectItem value='18:30'>18:30</SelectItem>
                <SelectItem value='19:00'>19:00</SelectItem><SelectItem value='19:30'>19:30</SelectItem>
                <SelectItem value='20:00'>20:00</SelectItem><SelectItem value='20:30'>20:30</SelectItem>
                <SelectItem value='21:00'>21:00</SelectItem><SelectItem value='21:30'>21:30</SelectItem>
                <SelectItem value='22:00'>22:00</SelectItem><SelectItem value='22:30'>22:30</SelectItem>
                <SelectItem value='23:00'>23:00</SelectItem><SelectItem value='23:30'>23:30</SelectItem>
                <SelectItem value='00:00'>00:00</SelectItem><SelectItem value='00:30'>00:30</SelectItem>
                <SelectItem value='01:00'>01:00</SelectItem><SelectItem value='01:30'>01:30</SelectItem>
                <SelectItem value='02:00'>02:00</SelectItem><SelectItem value='02:30'>02:30</SelectItem>
                <SelectItem value='03:00'>03:00</SelectItem><SelectItem value='03:30'>03:30</SelectItem>
                <SelectItem value='04:00'>04:00</SelectItem><SelectItem value='04:30'>04:30</SelectItem>
              </Select>
            </Stack>
          </InputGrid>
        </Grid>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>도착 일자</Label>
          </Grid>
          <InputGrid item xs={9}>
            <Stack direction='row' spacing={1}>
              <TextField
                name='arrivalDate'
                size='small'
                type='date'
                value={place.arrivalDate}
                InputProps={{disabled: !modify}}
                inputProps={{min: currentDate}}
                onChange={modifyPlaceData}
              />
              <Select
                name='arrivalTime'
                size='small'
                value={place.arrivalTime}
                disabled={!modify}
                MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                onChange={modifyPlaceData}
              >
                <SelectItem value='05:00'>05:00</SelectItem><SelectItem value='05:30'>05:30</SelectItem>
                <SelectItem value='06:00'>06:00</SelectItem><SelectItem value='06:30'>06:30</SelectItem>
                <SelectItem value='07:00'>07:00</SelectItem><SelectItem value='07:30'>07:30</SelectItem>
                <SelectItem value='08:00'>08:00</SelectItem><SelectItem value='08:30'>08:30</SelectItem>
                <SelectItem value='09:00'>09:00</SelectItem><SelectItem value='09:30'>09:30</SelectItem>
                <SelectItem value='10:00'>10:00</SelectItem><SelectItem value='10:30'>10:30</SelectItem>
                <SelectItem value='11:00'>11:00</SelectItem><SelectItem value='11:30'>11:30</SelectItem>
                <SelectItem value='12:00'>12:00</SelectItem><SelectItem value='12:30'>12:30</SelectItem>
                <SelectItem value='13:00'>13:00</SelectItem><SelectItem value='13:30'>13:30</SelectItem>
                <SelectItem value='14:00'>14:00</SelectItem><SelectItem value='14:30'>14:30</SelectItem>
                <SelectItem value='15:00'>15:00</SelectItem><SelectItem value='15:30'>15:30</SelectItem>
                <SelectItem value='16:00'>16:00</SelectItem><SelectItem value='16:30'>16:30</SelectItem>
                <SelectItem value='17:00'>17:00</SelectItem><SelectItem value='17:30'>17:30</SelectItem>
                <SelectItem value='18:00'>18:00</SelectItem><SelectItem value='18:30'>18:30</SelectItem>
                <SelectItem value='19:00'>19:00</SelectItem><SelectItem value='19:30'>19:30</SelectItem>
                <SelectItem value='20:00'>20:00</SelectItem><SelectItem value='20:30'>20:30</SelectItem>
                <SelectItem value='21:00'>21:00</SelectItem><SelectItem value='21:30'>21:30</SelectItem>
                <SelectItem value='22:00'>22:00</SelectItem><SelectItem value='22:30'>22:30</SelectItem>
                <SelectItem value='23:00'>23:00</SelectItem><SelectItem value='23:30'>23:30</SelectItem>
                <SelectItem value='00:00'>00:00</SelectItem><SelectItem value='00:30'>00:30</SelectItem>
                <SelectItem value='01:00'>01:00</SelectItem><SelectItem value='01:30'>01:30</SelectItem>
                <SelectItem value='02:00'>02:00</SelectItem><SelectItem value='02:30'>02:30</SelectItem>
                <SelectItem value='03:00'>03:00</SelectItem><SelectItem value='03:30'>03:30</SelectItem>
                <SelectItem value='04:00'>04:00</SelectItem><SelectItem value='04:30'>04:30</SelectItem>
              </Select>
            </Stack>
          </InputGrid>
        </Grid>
      </GridContainer>

      <GridContainer container>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>출발 장소</Label>
          </Grid>
          <InputGrid item xs={9}>
            <Stack direction='row' sx={{flexWrap: 'wrap'}}>
              <Select
                name='departPlace'
                size='small'
                disabled={!modify}
                value={place.departPlace}
                MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                onChange={modifyPlaceData}
              >
                <SelectItem value='[서울]'>서울</SelectItem>
                <SelectItem value='[경기]'>경기</SelectItem>
                <SelectItem value='[강원]'>강원</SelectItem>
                <SelectItem value='[경북]'>경북</SelectItem>
                <SelectItem value='[경남]'>경남</SelectItem>
                <SelectItem value='[전북]'>전북</SelectItem>
                <SelectItem value='[전남]'>전남</SelectItem>
                <SelectItem value='[제주]'>제주</SelectItem>
                <SelectItem value='[충북]'>충북</SelectItem>
                <SelectItem value='[충남]'>충남</SelectItem>
                <SelectItem value='[광주]'>광주</SelectItem>
                <SelectItem value='[대구]'>대구</SelectItem>
                <SelectItem value='[대전]'>대전</SelectItem>
                <SelectItem value='[부산]'>부산</SelectItem>
                <SelectItem value='[울산]'>울산</SelectItem>
                <SelectItem value='[인천]'>인천</SelectItem>
              </Select>
              <TextField
                name='departPlaceDetail'
                size='small'
                InputProps={{disabled: !modify}}
                value={place.departPlaceDetail}
                error={!!errorMsg.departPlaceDetail}
                helperText={errorMsg.departPlaceDetail}
                onChange={modifyPlaceData}
              />
            </Stack>
          </InputGrid>
        </Grid>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>도착 장소</Label>
          </Grid>
          <InputGrid item xs={9}>
            <Stack direction='row' sx={{flexWrap: 'wrap'}}>
              <Select
                name='arrivalPlace'
                size='small'
                disabled={!modify}
                value={place.arrivalPlace}
                MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                onChange={modifyPlaceData}
              >
                <SelectItem value='[서울]'>서울</SelectItem>
                <SelectItem value='[경기]'>경기</SelectItem>
                <SelectItem value='[강원]'>강원</SelectItem>
                <SelectItem value='[경북]'>경북</SelectItem>
                <SelectItem value='[경남]'>경남</SelectItem>
                <SelectItem value='[전북]'>전북</SelectItem>
                <SelectItem value='[전남]'>전남</SelectItem>
                <SelectItem value='[제주]'>제주</SelectItem>
                <SelectItem value='[충북]'>충북</SelectItem>
                <SelectItem value='[충남]'>충남</SelectItem>
                <SelectItem value='[광주]'>광주</SelectItem>
                <SelectItem value='[대구]'>대구</SelectItem>
                <SelectItem value='[대전]'>대전</SelectItem>
                <SelectItem value='[부산]'>부산</SelectItem>
                <SelectItem value='[울산]'>울산</SelectItem>
                <SelectItem value='[인천]'>인천</SelectItem>
              </Select>
              <TextField
                name='arrivalPlaceDetail'
                size='small'
                InputProps={{disabled: !modify}}
                value={place.arrivalPlaceDetail}
                error={!!errorMsg.arrivalPlaceDetail}
                helperText={errorMsg.arrivalPlaceDetail}
                onChange={modifyPlaceData}
              />
            </Stack>
          </InputGrid>
        </Grid>
      </GridContainer>

      <GridContainer container>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>경유지</Label>
          </Grid>
          <InputGrid item xs={9}>
            <TextField
              name='stopPlace'
              size='small'
              InputProps={{disabled: !modify}}
              value={data.stopPlace}
              onChange={modifyEstimateData}
            />
          </InputGrid>
        </Grid>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>세금계산서</Label>
          </Grid>
          <InputGrid item xs={9}>
            <RadioGroup row value={data.taxBill} onChange={modifyEstimateData}>
              <FormControlLabel
                name='taxBill'
                value='발급'
                label='발급'
                control={<Radio/>}
                disabled={!modify}
                checked={data.taxBill === '발급'}
              />
              <FormControlLabel
                name='taxBill'
                value='발급안함'
                label='발급안함'
                control={<Radio/>}
                disabled={!modify}
                checked={data.taxBill === '발급안함'}
              />
            </RadioGroup>
          </InputGrid>
        </Grid>
      </GridContainer>

      <GridContainer container>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>왕복구분</Label>
          </Grid>
          <InputGrid item xs={9}>
            <RadioGroup row defaultValue={data.wayType} onChange={modifyEstimateData}>
              <FormControlLabel
                name='wayType'
                value='왕복'
                control={<Radio/>}
                label='왕복'
                disabled={!modify}
                checked={data.wayType === '왕복'}
              />
              <FormControlLabel
                name='wayType'
                value='편도'
                control={<Radio/>}
                label='편도'
                disabled={!modify}
                checked={data.wayType === '편도'}
              />
            </RadioGroup>
          </InputGrid>
        </Grid>
        <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={3}>
            <Label>결제방법</Label>
          </Grid>
          <InputGrid item xs={9}>
            <RadioGroup row value={data.payment} onChange={modifyEstimateData}>
              <FormControlLabel
                name='payment'
                value='현금'
                control={<Radio/>}
                label='현금'
                disabled={!modify}
                checked={data.payment === '현금'}
              />
              <FormControlLabel
                name='payment'
                value='카드'
                control={<Radio/>}
                label='카드'
                disabled={!modify}
                checked={data.payment === '카드'}
              />
            </RadioGroup>
          </InputGrid>
        </Grid>
      </GridContainer>

      <GridContainer container>
        <Grid item xs={1.5}>
          <Label sx={{textAlign: 'end'}}> 기타 메모</Label>
        </Grid>
        <InputGrid item xs={10.5}>
          <TextField
            name='memo'
            type='text'
            size='small'
            value={data.memo}
            InputProps={{disabled: !modify}}
            variant='outlined'
            sx={{width: '80%'}}
            onChange={modifyEstimateData}
          />
        </InputGrid>
      </GridContainer>
    </Stack>
  )
}

const Label = styled(Typography)({
  minWidth: 50,
  padding: '0.2em 1em 0.2em 0',
  textAlign: 'end',
  fontSize: '0.9em'
})

const GridContainer = styled(Grid)({
  padding: '0.5em 1em',
  borderBottom: '1px solid rgb(224, 224, 224)'
})

const InputGrid = styled(Grid)({
  textAlign: 'start'
})