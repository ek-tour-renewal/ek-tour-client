import {Select} from "@mui/material";
import SelectItem from "../../common/Select";

export function VehicleSelect(props) {
  return (
    <Select size='small' name={props.name} defaultValue={'25인승 소형'} inputRef={props.inputRef}>
      <SelectItem value={'25인승 소형'}>25인승 소형</SelectItem>
      <SelectItem value={'28인승 리무진'}>28인승 리무진</SelectItem>
      <SelectItem value={'45인승 대형'}>45인승 대형</SelectItem>
    </Select>
  )
}

export function VehicleNumSelect(props) {
  return (
    <Select size='small' name={props.name} defaultValue={'1'} inputRef={props.inputRef}>
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
  )
}
