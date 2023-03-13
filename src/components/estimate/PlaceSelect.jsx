import {Select} from "@mui/material";
import SelectItem from "../common/Select";

export function PlaceSelect(props) {
  return (
    <Select size='small' name={props.name} defaultValue={'[서울]'} inputRef={props.inputRef} MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}>
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
  )
}