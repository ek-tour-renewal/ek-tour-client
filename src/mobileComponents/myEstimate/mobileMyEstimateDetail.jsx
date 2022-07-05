import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Cell = (props) => {
  if (props.type === 'label')
    return <TableCell align='center' sx={{maxWidth: 80, wordBreak:'keep-all'}} colSpan={props.colSpan} rowSpan={props.rowSpan}>{props.element}</TableCell>
  else 
    return <TableCell align='left' colSpan={4} rowSpan={props.rowSpan}>{props.element}</TableCell>
}

export default function MobileMyEstimateDetail({ ektour }) {

  const navigate = useNavigate();
  const { page, estimateId } = useParams();
  const { state } = useLocation();

  const [data, setData] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    travelType: '',
    vehicleType: '',
    vehicleNumber: '',
    memberCount: '',
    departDate: '',
    arrivalDate: '',
    departPlace: '',
    arrivalPlace: '',
    memo: '',
    stopPlace: '',
    wayType: '',
    payment: '',
    taxBill: '',
    visibility: true,
    createdDate: '',
    ip: ''
  });

  const [form, setForm] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    travelType: '',
    vehicleType: '',
    vehicleNumber: '',
    memberCount: '',
    departDate: '',
    arrivalDate: '',
    departPlace: '',
    arrivalPlace: '',
    memo: '',
    stopPlace: '',
    wayType: '',
    payment: '',
    taxBill: '',
    visibility: true,
    createdDate: '',
    ip: ''
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name] : value });
  }

  useEffect(() => {
    console.log(state);
    ektour.getEstimateDetailByIdAndForm(state.form, estimateId)
    .then(response => {
      console.log(response);
      setData(response);
      setForm(response);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <>
      <TableContainer sx={{maxHeight: '50vh'}}>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow sx={{ '& th': {bgcolor: '#fff4e5', pt: 1} }}>
            <TableCell align='center'><strong>정보</strong></TableCell>
            <TableCell colSpan={4}><strong>요청 내용</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <Cell type='label' element='요청일' />
            <Cell element={data.createdDate} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='등록자' />
            <Cell element={
              <TextField name='name' size='small' value={form.value} onChange={handleValueChange} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='이메일' />
            <Cell element={data.email} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='핸드폰' />
            <Cell element={data.phone} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='비밀번호' />
            <Cell element={data.password} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='여행 구분' />
            <Cell element={data.travelType} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='차량 구분' />
            <Cell element={data.vehicleType} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='차량 대수' />
            <Cell element={data.vehicleNumber} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='인원 수' />
            <Cell element={data.memberCount} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='출발 장소' />
            <Cell element={data.departPlace} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='출발 시간' />
            <Cell element={data.departDate} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='도착 장소' />
            <Cell element={data.arrivalPlace} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='도착 시간' />
            <Cell element={data.arrivalDate} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='경유지' />
            <Cell element={data.stopPlace} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='왕복 구분' />
            <Cell element={data.wayType} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='결제 방식' />
            <Cell element={data.payment} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='세금 계산서' />
            <Cell element={data.taxBill} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='기타 요청 사항' />
            <Cell element={data.memo} />
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
      <Stack direction='row' sx={{display: 'flex', justifyContent: 'center'}}>
        <Button>수정</Button>
      </Stack>
    </>
  );
}