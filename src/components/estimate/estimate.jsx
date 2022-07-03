import React, { useState, useRef } from "react";
import styles from "./estimate.module.css";
import Select from "@mui/material/Select";
import {
  MenuItem,
  Grid,
  TextField,
  Box,
  Stack,
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
} from "@mui/material";
import axios from "axios";

const Estimate = (props) => {
  const buttonRef = useRef();
  const [visible, setVisible] = useState(false);

  const [estimateForm, setEstimateForm] = useState({
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
    departPlaceDetail: "",
    arrivalPlace: "[서울]",
    arrivalPlaceDetail: "",
    memo: "",
    stopPlace: "",
    wayType: "왕복",
    payment: "현금",
    taxBill: false,
  });

  const openDetail = () => {
    setVisible(!visible);
  };

  // 세금계산서 true, false 변환
  const convertBool = (str) => {
    if (str == "true") return true;
    else return false;
  };

  // 서버로 견적요청 post
  const onSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const data = {
        name: estimateForm.name,
        email: estimateForm.email,
        phone: estimateForm.phone,
        password: estimateForm.password,
        travelType: estimateForm.travelType,
        vehicleType: estimateForm.vehicleType,
        vehicleNumber: Number(estimateForm.vehicleNumber),
        memberCount: Number(estimateForm.memberCount),
        departDate: estimateForm.departDate,
        departPlace: estimateForm.departPlace + estimateForm.departPlaceDetail,
        arrivalDate: estimateForm.arrivalDate,
        arrivalPlace:
          estimateForm.arrivalPlace + estimateForm.arrivalPlaceDetail,
        memo: estimateForm.memo,
        stopPlace: estimateForm.stopPlace,
        wayType: estimateForm.wayType,
        payment: estimateForm.payment,
        taxBill: convertBool(estimateForm.taxBill),
      };
      // console.log(data);
      axios
        .post("/estimate", data)
        .then((response) => {
          alert("견적을 요청했습니다.");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setEstimateForm({
      ...estimateForm,
      [name]: value,
    });
  };

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
    if (estimateForm.name === "") {
      setNameErrorMsg("이름을 입력해주세요.");
      return false;
    }
    if (estimateForm.phone.includes("-")) {
      setPhoneErrorMsg(`'-' 빼고 숫자만 입력해주세요.`);
      return false;
    } else if (estimateForm.phone === "" || estimateForm.phone.length < 8) {
      setPhoneErrorMsg("연락처를 입력해 주세요.");
      return false;
    }
    if (estimateForm.email === "") {
      setEmailErrorMsg("이메일을 입력해 주세요.");
      return false;
    }
    if (estimateForm.password === "" || estimateForm.password.length < 4) {
      setPasswordErrorMsg("확인용 비밀번호 4자리를 입력해주세요.");
      return false;
    }
    resetErrorMsg();
    return true;
  };

  return (
    <Paper sx={{width: '50%', marginTop: '2em', padding: '1em 0', borderRadius: '20px'}} elevation={10}>
      <p className={styles.estimateBox}>실시간 견적요청</p>
      <form className={styles.data}>
        <Grid
          container
          spacing={2}
          sx={{
            paddingTop: 3,
            paddingBottom: 3,
          }}
        >
          <Grid container spacing={2} sx={{ padding: 3 }}>
            <Grid item xs={6}>
              <TextField
                label="이름"
                type="text"
                name="name"
                variant="outlined"
                size="small"
                autoComplete="off"
                onChange={handleValueChange}
                error={nameErrorMsg ? true : false}
                helperText={nameErrorMsg}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="연락처"
                type="text"
                name="phone"
                variant="outlined"
                size="small"
                autoComplete="off"
                onChange={handleValueChange}
                error={phoneErrorMsg ? true : false}
                helperText={phoneErrorMsg}
                inputProps={{ maxLength: 11 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="확인용 비밀번호"
                type="password"
                name="password"
                variant="outlined"
                size="small"
                autoComplete="off"
                onChange={handleValueChange}
                error={passwordErrorMsg ? true : false}
                helperText={passwordErrorMsg}
                inputProps={{ maxLength: 4 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="이메일"
                type="email"
                name="email"
                variant="outlined"
                size="small"
                autoComplete="off"
                onChange={handleValueChange}
                error={emailErrorMsg ? true : false}
                helperText={emailErrorMsg}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="출발일자"
              type="datetime-local"
              name="departDate"
              InputLabelProps={{ shrink: true }}
              value={estimateForm.departDate}
              onChange={handleValueChange}
              sx={{
                width: "60%",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="귀행일자"
              type="datetime-local"
              name="arrivalDate"
              InputLabelProps={{ shrink: true }}
              onChange={handleValueChange}
              value={estimateForm.arrivalDate}
              sx={{
                width: "60%",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="departPlace"
              name="departPlace"
              onChange={handleValueChange}
              value={estimateForm.departPlace}
              defaultValue={estimateForm.departPlace}
              sx={{
                marginLeft: 1,
                width: "20%",
              }}
            >
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
              label="출발지 세부정보"
              type="text"
              name="departPlaceDetail"
              variant="outlined"
              autoComplete="off"
              sx={{
                marginLeft: 3,
                width: "60%",
              }}
              onChange={handleValueChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="arrivalPlace"
              name="arrivalPlace"
              onChange={handleValueChange}
              value={estimateForm.arrivalPlace}
              defaultValue={estimateForm.arrivalPlace}
              sx={{
                marginLeft: 1,
                width: "20%",
              }}
            >
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
              label="도착지 세부정보"
              type="text"
              name="arrivalPlaceDetail"
              variant="outlined"
              autoComplete="off"
              sx={{
                marginLeft: 3,
                width: "60%",
              }}
              onChange={handleValueChange}
            />
          </Grid>
          <Stack
            direction="row"
            sx={{
              margin: "0 auto",
              marginTop: 3,
            }}
            spacing={5}
          >
            <Select
              labelId="travelType"
              name="travelType"
              onChange={handleValueChange}
              size="small"
              value={estimateForm.travelType}
              defaultValue={estimateForm.travelType}
              sx={{
                width: "60%",
              }}
            >
              <MenuItem value={"일반여행"}>일반여행</MenuItem>
              <MenuItem value={"관혼상제"}>관혼상제</MenuItem>
              <MenuItem value={"학교단체"}>학교단체</MenuItem>
              <MenuItem value={"기타단체"}>기타단체</MenuItem>
            </Select>
            <Select
              labelId="vehicleType"
              name="vehicleType"
              onChange={handleValueChange}
              size="small"
              value={estimateForm.vehicleType}
              defaultValue={estimateForm.vehicleType}
              sx={{
                width: "60%",
              }}
            >
              <MenuItem value={"25인승 소형"}>25인승 소형</MenuItem>
              <MenuItem value={"28인승 리무진"}>28인승 리무진</MenuItem>
              <MenuItem value={"45인승 대형"}>45인승 대형</MenuItem>
            </Select>
            <Select
              value={estimateForm.vehicleNumber}
              defaultValue={estimateForm.vehicleNumber}
              onChange={handleValueChange}
              size="small"
              name="vehicleNumber"
              sx={{
                width: "60%",
              }}
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
          </Stack>
        </Grid>
        {visible && (
          <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid item xs={12}>
              <TextField
                label="경유지"
                type="text"
                name="stopPlace"
                variant="outlined"
                size="small"
                onChange={handleValueChange}
                sx={{
                  width: "80%",
                }}
              />
            </Grid>
            <Stack
              direction="row"
              sx={{
                margin: "0 auto",
                marginTop: 3,
              }}
              spacing={2}
            >
              <RadioGroup row defaultValue="왕복" onChange={handleValueChange}>
                <FormControlLabel
                  name="wayType"
                  value="왕복"
                  control={<Radio />}
                  label="왕복"
                />
                <FormControlLabel
                  name="wayType"
                  value="편도"
                  control={<Radio />}
                  label="편도"
                />
              </RadioGroup>
              <RadioGroup row defaultValue="현금" onChange={handleValueChange}>
                <FormControlLabel
                  name="payment"
                  value="현금"
                  control={<Radio />}
                  label="현금"
                />
                <FormControlLabel
                  name="payment"
                  value="카드"
                  control={<Radio />}
                  label="카드"
                />
              </RadioGroup>
              <RadioGroup row defaultValue={true} onChange={handleValueChange}>
                <FormControlLabel
                  name="taxBill"
                  value={true}
                  control={<Radio />}
                  label="세금계산서 발급"
                />
                <FormControlLabel
                  name="taxBill"
                  value={false}
                  control={<Radio />}
                  label="발급안함"
                />
              </RadioGroup>
            </Stack>
            <Grid item xs={12}>
              <TextField
                label="인원"
                type="number"
                name="memberCount"
                variant="outlined"
                size="small"
                onChange={handleValueChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="기타 메모 사항"
                type="text"
                name="memo"
                variant="outlined"
                onChange={handleValueChange}
                multiline
                minRows={3}
                autoComplete="off"
                sx={{
                  width: "80%",
                }}
              />
            </Grid>
          </Grid>
        )}
        {/* 견적요청 버튼 */}
        <Box>
          <button
            type="submit"
            className={styles.requestButton}
            onClick={onSubmit}
          >
            견적요청
          </button>
        </Box>
        <li className={styles.viewMore}>
          <button
            className={styles.moreButton}
            type="button"
            ref={buttonRef}
            onClick={openDetail}
          >
            {visible ? (buttonRef.current.value = "간략요청") : "상세요청"}
          </button>
        </li>
      </form>
    </Paper>
  );
};

export default Estimate;
