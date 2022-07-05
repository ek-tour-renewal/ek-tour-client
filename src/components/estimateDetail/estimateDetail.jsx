import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import SubHeader from "../subHeader/subHeader";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";


const Cell = (props) => {
  if (props.type === "label")
    return (
      <TableCell
        align="right"
        sx={{ minWidth: 80 }}
        colSpan={props.colSpan}
        rowSpan={props.rowSpan}
      >
        {props.element}
      </TableCell>
    );
  else
    return (
      <TableCell align="left" colSpan={props.colSpan} rowSpan={props.rowSpan}>
        {props.element}
      </TableCell>
    );
};

export default function EstimateDetail({ ektour }) {
  const navigate = useNavigate();
  const { page, estimateId } = useParams();

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleClickUpdateDialog = () => {
    setOpenUpdate(true);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  // 수정 - 유효성 검사
  const [nameErrorMsg, setNameErrorMsg] = useState(null);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);

  const resetErrorMsg = () => {
    setNameErrorMsg(null);
    setPhoneErrorMsg(null);
    setEmailErrorMsg(null);
    setPasswordErrorMsg(null);
  };

  const validate = () => {
    var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (info.name === "") {
      setNameErrorMsg("이름을 입력해주세요.");
      return false;
    }
    if (info.phone.includes("-")) {
      setPhoneErrorMsg(`'-' 빼고 숫자만 입력해주세요.`);
      return false;
    } else if (info.phone === "" || info.phone.length < 8) {
      setPhoneErrorMsg("연락처를 입력해 주세요.");
      return false;
    }
    if (regEmail.test(info.email) === false) {
      setEmailErrorMsg("이메일 형식에 맞게 입력 해 주세요.");
      return false;
    }
    if (info.password === "" || info.password.length < 4) {
      setPasswordErrorMsg("확인용 비밀번호 숫자 4자리를 입력해주세요.");
      return false;
    }
    resetErrorMsg();
    return true;
  };

  // 견적 삭제
  const deleteEstimate = () => {
    axios.delete(`/estimate/${estimateId}`)
    .then((response) => {})
    .catch((error) => {console.log(error)});
  alert("해당 견적을 삭제했습니다.");
  window.location.href="http://ekhanabus.co.kr/estmiate/list/1"
  }

  // 견적 수정 모드 boolean
  const [modify, setModify] = useState(false);
  const handleClickModifyEstimate = () => {
    console.log(info);
    let validateResult = validate();
    setModify(!modify);
    if (modify == true && validateResult == true) {
      axios.put(`/estimate/${estimateId}`, info)
        .then((response) => {})
        .catch((error) => {console.log(error)});
      alert("견적 요청 내용이 수정되었습니다.");
    }
  };
  const handleCloseUpdateDialog = () => {
    setOpenUpdate(false);
  };
  const handleClickDeleteEstimate = () => {
    setOpenDelete(true);
  };

  // 서버로부터 받아온 견적요청 상세보기 데이터
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    travelType: "일반여행",
    vehicleType: "25인승 소형",
    vehicleNumber: "1",
    memberCount: "",
    departDate: new Date().toISOString().slice(0, 16),
    arrivalDate: new Date().toISOString().slice(0, 16),
    departPlace: "[서울]",
    arrivalPlace: "[서울]",
    memo: "",
    stopPlace: "",
    wayType: "왕복",
    payment: "현금",
    taxBill: "발급",
  });
  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  // 페이지 들어가면 데이터 서버로부터 가져온 데이터 세팅
  useEffect(() => {
    ektour
      .getEstimateDetailById(estimateId)
      .then((response) => {
        setInfo(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Box mb={3}>
        <SubHeader menu="견적 상세 내역" />
        <ArrowCircleRightIcon style={{}} />
        <Table
          stickyHeader
          size="small"
          sx={{
            width: "80%",
            m: "2em auto",
            minWidth: 600,
            verticalAlign: "middle",
          }}
        >
          <TableHead>
            <TableRow
              sx={{ "& th": { bgcolor: !modify ? "#fff4e5" : "#fdeded" } }}
            >
              <TableCell
                colSpan={2}
                color={modify ? "yellow" : "gray"}
                style={{ padding: "1em" }}
              >
                <Typography variant="h6">
                  <strong>
                    {modify ? "견적 요청 내역 수정" : "견적 상세 내용"}
                  </strong>
                </Typography>
              </TableCell>
              <TableCell colSpan={2} align="right">
                <Stack
                  direction={"row"}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  spacing={2}
                >
                  <Button
                    onClick={handleClickModifyEstimate}
                    variant="contained"
                    color={modify ? "success" : "primary"}
                  >
                    {modify ? "수정 완료" : "수정"}
                  </Button>
                  <Button
                    onClick={handleClickDeleteEstimate}
                    variant="contained"
                    color="error"
                  >
                    삭제
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "gray", color: "white" }}
                    href="javascript:window.history.back();"
                  >
                    뒤로
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Cell element="이름" type="label" />
              <Cell
                element={
                  <TextField
                    size="small"
                    InputProps={{ readOnly: !modify }}
                    name="name"
                    value={info.name}
                    onChange={handleValueChange}
                    error={nameErrorMsg ? true : false}
                    helperText={nameErrorMsg}
                  />
                }
              />
              <Cell element="이메일" type="label" />
              <Cell
                element={
                  <TextField
                    size="small"
                    InputProps={{ readOnly: !modify }}
                    name="email"
                    value={info.email}
                    onChange={handleValueChange}
                    error={emailErrorMsg ? true : false}
                    helperText={emailErrorMsg}
                    
                  />
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="연락처" type="label" />
              <Cell
                element={
                  <TextField
                    size="small"
                    InputProps={{ readOnly: !modify }}
                    inputProps={{ maxLength: 11 }}
                    name="phone"
                    value={info.phone}
                    onChange={handleValueChange}
                    error={phoneErrorMsg ? true : false}
                    helperText={phoneErrorMsg}
                  />
                }
              />
              <Cell element="비밀번호" type="label" />
              <Cell
                element={
                  <TextField
                    size="small"
                    InputProps={{ readOnly: !modify }}
                    inputProps={{ maxLength: 4 }}
                    name="password"
                    value={info.password}
                    type="text"
                    onChange={handleValueChange}
                    error={passwordErrorMsg ? true : false}
                    helperText={passwordErrorMsg}
                  />
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="여행 구분" type="label" />
              <Cell
                element={
                  <Select
                    size="small"
                    disabled={!modify}
                    name="travelType"
                    value={info.travelType}
                    onChange={handleValueChange}
                  >
                    <MenuItem value="일반여행">일반여행</MenuItem>
                    <MenuItem value="관혼상제">관혼상제</MenuItem>
                    <MenuItem value="학교단체">학교단체</MenuItem>
                    <MenuItem value="기타단체">기타단체</MenuItem>
                  </Select>
                }
              />
              <Cell element="인원" type="label" />
              <Cell
                element={
                  <TextField
                    size="small"
                    InputProps={{ readOnly: !modify }}
                    name="memberCount"
                    value={info.memberCount}
                    onChange={handleValueChange}
                  />
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="차량 구분" type="label" />
              <Cell
                element={
                  <Select
                    size="small"
                    disabled={!modify}
                    name="vehicleType"
                    value={info.vehicleType}
                    onChange={handleValueChange}
                  >
                    <MenuItem value="25인승 소형">25인승 소형</MenuItem>
                    <MenuItem value="28인승 리무진">28인승 리무진</MenuItem>
                    <MenuItem value="45인승 대형">45인승 대형</MenuItem>
                  </Select>
                }
              />
              <Cell element="차량 대수" type="label" />
              <Cell
                element={
                  <Select
                    size="small"
                    disabled={!modify}
                    name="vehicleNumber"
                    value={info.vehicleNumber}
                    onChange={handleValueChange}
                  >
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
                  </Select>
                }
              />
            </TableRow>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <Cell element="출발 일자" type="label" />
              <Cell
                element={
                  <TextField
                    InputProps={{ readOnly: !modify }}
                    type="datetime-local"
                    name="departDate"
                    value={info.departDate}
                    onChange={handleValueChange}
                  />
                }
              />
              <Cell element="도착 일자" type="label" />
              <Cell
                element={
                  <TextField
                    InputProps={{ readOnly: !modify }}
                    type="datetime-local"
                    name="arrivalDate"
                    value={info.arrivalDate}
                    onChange={handleValueChange}
                  />
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="출발 장소" type="label" />
              <Cell
                element={
                  <>
                    <TextField
                      InputProps={{ readOnly: !modify }}
                      name="departPlace"
                      value={info.departPlace}
                      onChange={handleValueChange}
                    />
                  </>
                }
              />
              <Cell element="도착 장소" type="label" />
              <Cell
                element={
                  <>
                    <TextField
                      InputProps={{ readOnly: !modify }}
                      name="arrivalPlace"
                      value={info.arrivalPlace}
                      onChange={handleValueChange}
                    />
                  </>
                }
              />
            </TableRow>
            <TableRow>
              <Cell element="경유지" type="label"/>
              <Cell element={
                <>
                <TextField
                type="text"
                name="stopPlace"
                variant="outlined"
                size="small"
                value={info.stopPlace}
                InputProps={{ readOnly: !modify }}
                onChange={handleValueChange}
                sx={{
                  width: "85%",
                }}
              />                
                </>
              }/>
              <Cell element="세금계산서" type="label"/>
              <Cell element={
                <>
                <RadioGroup row defaultValue={info.taxBill} onChange={handleValueChange}>
                <FormControlLabel
                  name="taxBill"
                  value="발급"
                  control={<Radio />}
                  label="발급"
                  disabled={!modify}
                  checked={info.taxBill === "발급"}
                />
                <FormControlLabel
                  name="taxBill"
                  value="발급안함"
                  control={<Radio />}
                  label="발급안함"
                  disabled={!modify}
                  checked={info.taxBill === "발급안함"}
                />
                </RadioGroup>
                </>
              }/>
            </TableRow>
            <TableRow>
              <Cell element="왕복구분" type="label"/>
              <Cell element={
                <>
                <RadioGroup row defaultValue={info.wayType} onChange={handleValueChange}>
                <FormControlLabel
                  name="wayType"
                  value="왕복"
                  control={<Radio />}
                  label="왕복"
                  disabled={!modify}
                  checked={info.wayType === "왕복"}
                />
                <FormControlLabel
                  name="wayType"
                  value="편도"
                  control={<Radio />}
                  label="편도"
                  disabled={!modify}
                  checked={info.wayType === "편도"}
                />
                </RadioGroup>
                </>
              }/>
              <Cell element="결제방법" type="label"/>
              <Cell element={
                <>
                <RadioGroup row defaultValue={info.payment} onChange={handleValueChange}>
                <FormControlLabel
                  name="payment"
                  value="현금"
                  control={<Radio />}
                  label="현금"
                  disabled={!modify}
                  checked={info.payment === "현금"}
                />
                <FormControlLabel
                  name="payment"
                  value="카드"
                  control={<Radio />}
                  label="카드"
                  disabled={!modify}
                  checked={info.payment === "카드"}
                />
                </RadioGroup>
                </>
              }/>
            </TableRow>
            <TableRow>
            <Cell element="기타 메모" type="label"/>
              <Cell colSpan={3} element={
                <>
                <TextField
                value={info.memo}
                type="text"
                name="memo"
                InputProps={{ readOnly: !modify }}
                variant="outlined"
                size="small"
                onChange={handleValueChange}
                sx={{
                  width: "85%",
                }}
              />                
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
            <AlertTitle>
              <strong style={{ fontSize: 18 }}>견적 요청 삭제</strong>
            </AlertTitle>
            정말로 해당 견적 요청을 삭제하시겠습니까?
          </Alert>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={deleteEstimate}>예</Button>
            <Button onClick={handleCloseDeleteDialog}>아니오</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* 수정 여부 묻는 다이얼로그 */}
      <Dialog open={openUpdate} onClose={handleCloseUpdateDialog}>
        <DialogContent>
          <Alert severity="warning">
            <AlertTitle>
              <strong style={{ fontSize: 18 }}>견적 요청 수정</strong>
            </AlertTitle>
            작성하진 정보를 반영하여 견적 요청을 수정합니다.
          </Alert>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button>예</Button>
            <Button onClose={handleCloseUpdateDialog}>아니오</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
