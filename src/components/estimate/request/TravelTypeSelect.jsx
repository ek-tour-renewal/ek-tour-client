import {Select} from "@mui/material";
import SelectItem from "../../common/Select";

export function TravelTypeSelect(props) {
  return (
    <Select size='small' name={props.name} defaultValue={'일반여행'}
            inputRef={props.inputRef}>
      <SelectItem value={'일반여행'}>일반여행</SelectItem>
      <SelectItem value={'관혼상제'}>관혼상제</SelectItem>
      <SelectItem value={'학교단체'}>학교단체</SelectItem>
      <SelectItem value={'기타단체'}>기타단체</SelectItem>
    </Select>
  )
}
