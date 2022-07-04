import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import SubHeader from "../subHeader/subHeader";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Alert, AlertTitle, Box, Button, ButtonGroup, Dialog, DialogContent, MenuItem, Select, Table, TableBody, TableHead, TableRow, TextField, Typography } from "@mui/material";

const Cell = (props) => {
  if (props.type === 'label')
    return <TableCell align='right' sx={{minWidth: 80}} colSpan={props.colSpan} rowSpan={props.rowSpan}>{props.element}</TableCell>
  else 
    return <TableCell align='left' colSpan={props.colSpan} rowSpan={props.rowSpan}>{props.element}</TableCell>
}

export default function EstimateDetail(data) {

  const navigate = useNavigate();
  const { page, estimateId } = useParams();

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleClickUpdateDialog = () => {
    setOpenUpdate(true);
  }

  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  }

  // 견적 수정 모드 boolean
  const [modify, setModify] = useState(false);
  const handleClickModifyEstimate = () => { 
    setModify(!modify);
  }
  const handleCloseUpdateDialog = () => {
    setOpenUpdate(false);
  }
  const handleClickDeleteEstimate = () => {
    setOpenDelete(true);
  }

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    travelType: "일반여행",
    vehicleType: "25인승 소형",
    vehicleNumber: "",
    memberCount: '',
    departDate: new Date().toISOString().slice(0, 16),
    arrivalDate: new Date().toISOString().slice(0, 16),
    departPlace: "[서울]",
    departPlaceDetail: "",
    arrivalPlace: "[서울]",
    arrivalPlaceDetail: "",
    memo: "",
    stopPlace: "",
    wayType: "왕복",
    payment: "현금",
    taxBill: false,
  });
  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name] : value
    });
  }

  return (
    <>
    <Box mb={3}>
      <SubHeader menu='견적 상세 내역' />
      <ArrowCircleRightIcon style={{}} />
      <Table stickyHeader size='small' sx={{ width: '80%', m: '2em auto', minWidth: 600, 
        verticalAlign: 'middle' }}>
      <TableHead>
        <TableRow sx={{ '& th': {bgcolor: !modify ? '#fff4e5' : '#fdeded'} }}>
          <TableCell colSpan={2} color={modify ? 'yellow' : 'gray'} style={{padding: '1em'}}>
            <Typography variant="h6">
              <strong>{ modify ? '견적 요청 내역 수정' : '견적 상세 내용' }</strong>
            </Typography>
          </TableCell>
          <TableCell colSpan={2} align='right'>
            <ButtonGroup>
              <Button onClick={handleClickModifyEstimate} variant='contained' color={modify ? 'success' : 'primary'}>
                { modify ? '수정 완료' : '수정' }
              </Button>
              <Button onClick={handleClickDeleteEstimate} variant='contained' color='error'>삭제</Button>
              <Button variant='contained' style={{backgroundColor: 'gray', color: 'white'}}>뒤로</Button>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <Cell element='이름' type='label' />
          <Cell element={<TextField size='small' InputProps={{ readOnly: !modify }} name='name' value={info.name} onChange={handleValueChange} />} />
          <Cell element='이메일' type='label' />
          <Cell element={<TextField size='small' InputProps={{ readOnly: !modify }} name='email' value={info.email} onChange={handleValueChange} />} />
        </TableRow>
        <TableRow>
          <Cell element='연락처' type='label' />
          <Cell element={<TextField size='small' InputProps={{ readOnly: !modify }} inputProps={{ maxLength: 11 }} name='phone' value={info.phone} onChange={handleValueChange} />} />
          <Cell element='비밀번호' type='label' />
          <Cell element={<TextField size='small' InputProps={{ readOnly: !modify }} inputProps={{ maxLength: 4 }} name='password' value={info.password} type='password' onChange={handleValueChange} />} />
        </TableRow>
        <TableRow>
          <Cell element='여행 구분' type='label' />
          <Cell element={
            <Select size='small' disabled={!modify} name='travelType' value={info.travelType} onChange={handleValueChange}>
              <MenuItem value="일반여행">일반여행</MenuItem>
              <MenuItem value="관혼상제">관혼상제</MenuItem>
              <MenuItem value="학교단체">학교단체</MenuItem>
              <MenuItem value="기타단체">기타단체</MenuItem>
            </Select>}
          />
          <Cell element='인원' type='label' />
          <Cell element={<TextField size='small' InputProps={{ readOnly: !modify }} name='memberCount' value={info.memberCount} onChange={handleValueChange} />} />
        </TableRow>
        <TableRow>
          <Cell element='차량 구분' type='label' />
          <Cell element={<Select size='small' disabled={!modify} name='vehicleType' value={info.vehicleType} onChange={handleValueChange}>
            <MenuItem value="25인승 소형">25인승 소형</MenuItem>
            <MenuItem value="28인승 리무진">28인승 리무진</MenuItem>
            <MenuItem value="45인승 대형">45인승 대형</MenuItem>
          </Select>} />
          <Cell element='차량 대수' type='label' />
          <Cell element={<Select size='small' disabled={!modify} name='vehicleNumber' value={info.vehicleNumber} onChange={handleValueChange}>
            <MenuItem value="1">1대</MenuItem>
            <MenuItem value="2">2대</MenuItem>
            <MenuItem value="3">3대</MenuItem>
            <MenuItem value="4">4대</MenuItem>
            <MenuItem value="5">5대</MenuItem>
            <MenuItem value="6">6대</MenuItem>
            <MenuItem value="7">7대</MenuItem>
            <MenuItem value="8">8대</MenuItem>
            <MenuItem value="9">9대</MenuItem>
            <MenuItem value="10">10대 이상</MenuItem>
          </Select>}/>
        </TableRow>
        <TableRow sx={{ "& td": {border: 0} }}>
          <Cell element='출발 일자' type='label' />
          <Cell element={
            <TextField
              type="datetime-local"
              name="departDate"
              value={info.departDate}
              onChange={handleValueChange} />
          } />
          <Cell element='도착 일자' type='label' />
          <Cell element={
            <TextField
              type="datetime-local"
              name="arrivalDate"
              value={info.arrivalDate}
              onChange={handleValueChange} />
          } />
        </TableRow>
        <TableRow>
          <Cell element='출발 장소' type='label' />
          <Cell element={<>
            <Select
              value={info.arrivalPlace}
              defaultValue={info.arrivalPlace}
              onChange={handleValueChange}
              name="arrivalPlace">
              <MenuItem value="[서울]">서울</MenuItem>
              <MenuItem value="[경기]">경기</MenuItem>
              <MenuItem value="[강원]">강원</MenuItem>
              <MenuItem value="[경상]">경북</MenuItem>
              <MenuItem value="[경상]">경남</MenuItem>
              <MenuItem value="[전라]">전북</MenuItem>
              <MenuItem value="[전라]">전남</MenuItem>
              <MenuItem value="[제주]">제주</MenuItem>
              <MenuItem value="[충청]">충북</MenuItem>
              <MenuItem value="[충청]">충남</MenuItem>
              <MenuItem value="[광주]">광주</MenuItem>
              <MenuItem value="[대구]">대구</MenuItem>
              <MenuItem value="[대전]">대전</MenuItem>
              <MenuItem value="[부산]">부산</MenuItem>
              <MenuItem value="[울산]">울산</MenuItem>
              <MenuItem value="[인천]">인천</MenuItem>
            </Select>
            <TextField
              label="세부정보"
              name="arrivalPlaceDetail"
              value={info.arrivalPlaceDetail}
              onChange={handleValueChange} />
            </>
          } />
          <Cell element='도착 장소' type='label' />
          <Cell element={<>
            <Select
              value={info.departPlace}
              onChange={handleValueChange}
              name="departPlace">
              <MenuItem value="[서울]">서울</MenuItem>
              <MenuItem value="[경기]">경기</MenuItem>
              <MenuItem value="[강원]">강원</MenuItem>
              <MenuItem value="[경상]">경북</MenuItem>
              <MenuItem value="[경상]">경남</MenuItem>
              <MenuItem value="[전라]">전북</MenuItem>
              <MenuItem value="[전라]">전남</MenuItem>
              <MenuItem value="[제주]">제주</MenuItem>
              <MenuItem value="[충청]">충북</MenuItem>
              <MenuItem value="[충청]">충남</MenuItem>
              <MenuItem value="[광주]">광주</MenuItem>
              <MenuItem value="[대구]">대구</MenuItem>
              <MenuItem value="[대전]">대전</MenuItem>
              <MenuItem value="[부산]">부산</MenuItem>
              <MenuItem value="[울산]">울산</MenuItem>
              <MenuItem value="[인천]">인천</MenuItem>
            </Select>
            <TextField
              name="departPlaceDetail"
              value={info.departPlaceDetail}
              onChange={handleValueChange} />
            </>
          }/>
        </TableRow>
      </TableBody>
      </Table>
    </Box>
    
    

    {/* 삭제 여부 묻는 다이얼로그 */}
    <Dialog open={openDelete} onClose={handleCloseDeleteDialog}>
      <DialogContent>
        <Alert severity="error">
          <AlertTitle><strong style={{fontSize: 18}}>견적 요청 삭제</strong></AlertTitle>
          정말로 해당 견적 요청을 삭제하시겠습니까?
        </Alert>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button>예</Button>
          <Button>아니오</Button>
        </Box>
      </DialogContent>
    </Dialog>

    {/* 수정 여부 묻는 다이얼로그 */}
    <Dialog open={openUpdate} onClose={handleCloseUpdateDialog}>
      <DialogContent>
        <Alert severity="warning">
          <AlertTitle><strong style={{fontSize: 18}}>견적 요청 수정</strong></AlertTitle>
          작성하진 정보를 반영하여 견적 요청을 수정합니다.
        </Alert>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button>예</Button>
          <Button onClose={handleCloseUpdateDialog}>아니오</Button>
        </Box>
      </DialogContent>
    </Dialog>
    </>
  );
}