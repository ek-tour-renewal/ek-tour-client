import {
  Drawer,
  FormControlLabel,
  Typography,
  Box,
  Stack,
  RadioGroup,
  Radio,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./requestEstimateSlide.module.css";
import axios from "axios";

const RequestEstimateSlide = (props) => {
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
    departPlaceDetail: "",
    arrivalPlace: "[서울]",
    arrivalPlaceDetail: "",
    memo: "",
    stopPlace: "",
    wayType: "왕복",
    payment: "현금",
    taxBill: "발급",
  });

  // state 값 변화 처리
  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
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
    if (info.email === "" | regEmail.test(info.email) === false) {
      setEmailErrorMsg("이메일을 입력해 주세요.");
      return false;
    }
    if (info.password === "" || info.password.length < 4) {
      setPasswordErrorMsg("확인용 비밀번호 4자리를 입력해주세요.");
      return false;
    }
    resetErrorMsg();
    return true;
  };


  // 서버로 견적요청 post
  const onSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const data = {
        name: info.name,
        email: info.email,
        phone: info.phone,
        password: info.password,
        travelType: info.travelType,
        vehicleType: info.vehicleType,
        vehicleNumber: Number(info.vehicleNumber),
        memberCount: Number(info.memberCount),
        departDate: info.departDate,
        departPlace: info.departPlace + info.departPlaceDetail,
        arrivalDate: info.arrivalDate,
        arrivalPlace: info.arrivalPlace + info.arrivalPlaceDetail,
        memo: info.memo,
        stopPlace: info.stopPlace,
        wayType: info.wayType,
        payment: info.payment,
        taxBill: info.taxBill,
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
    } else {
      alert("필수 정보를 입력해주세요.");
    }
  };

  return (
    <Drawer
      id="drawer"
      anchor="right"
      open={props.open}
      onClose={props.handleCloseRequestEstimate}
    >
      <header className={styles.header}>
        <Typography
          sx={{
            width: "100%",
            color: "#FCFCFC",
            backgroundColor: "#EC9F46",
            textAlign: "center",
            padding: "1rem 0",
            fontSize: "1.5em",
            fontWeight: "bold",
            borderRadius: "1rem",
          }}
        >
          견적요청하기
        </Typography>
      </header>
      <Box padding={5}>
        {/* 견적요청 폼 */}
        <form className={styles.form} onSubmit={onSubmit}>
          <section className={styles.personalData}>
            <div className={styles.personalDataContainer}>
              <TextField
                value={info.name}
                label="이름"
                onChange={handleValueChange}
                name="name"
                autoComplete="off"
                error={nameErrorMsg ? true : false}
                helperText={nameErrorMsg}
              />
              <TextField
                value={info.email}
                label="이메일"
                onChange={handleValueChange}
                name="email"
                autoComplete="off"
                error={emailErrorMsg ? true : false}
                helperText={emailErrorMsg}
                sx={{
                  marginLeft: 10,
                }}
              />
            </div>
            <div className={styles.personalDataContainer}>
              <TextField
                value={info.phone}
                label="연락처"
                inputProps={{ maxLength: 11 }}
                onChange={handleValueChange}
                name="phone"
                autoComplete="off"
                error={phoneErrorMsg ? true : false}
                helperText={phoneErrorMsg}
              />
              <TextField
                value={info.password}
                label="확인용 비밀번호"
                inputProps={{ maxLength: 4 }}
                onChange={handleValueChange}
                name="password"
                type="password"
                autoComplete="off"
                error={passwordErrorMsg ? true : false}
                helperText={passwordErrorMsg}
                sx={{
                  marginLeft: 10,
                }}
              />
            </div>
          </section>
          <ol>
            <li className={styles.detailEstimate}>
              확인용 비밀번호는 4자리 숫자로 입력해 주세요.
            </li>
            <li className={styles.detailEstimate}>
              연락처(핸드폰 번호)와 비밀번호는 견적 내용 확인시 필요합니다.
            </li>
            <li className={styles.detailEstimate}>
              경유지가 있거나 기타 요구사항이 있으시면 정확한 견적을 위해 반드시{" "}
              <br /> 기입해 주시기 바랍니다.
            </li>
          </ol>
          <section className={styles.detailDataContainer}>
            <div className={styles.detailData}>
              <div className={styles.travelContainer}>
                <InputLabel>여행구분</InputLabel>
                <Select
                  value={info.travelType}
                  defaultValue={info.travelType}
                  onChange={handleValueChange}
                  name="travelType"
                >
                  <MenuItem value="일반여행">일반여행</MenuItem>
                  <MenuItem value="관혼상제">관혼상제</MenuItem>
                  <MenuItem value="학교단체">학교단체</MenuItem>
                  <MenuItem value="기타단체">기타단체</MenuItem>
                </Select>
                <TextField
                  value={info.memberCount}
                  label="인원"
                  onChange={handleValueChange}
                  name="memberCount"
                  autoComplete="off"
                  sx={{
                    marginLeft: 10,
                    marginRight: 1,
                    width: "7rem",
                  }}
                />
                명
              </div>
              <div className={styles.vehicleContainer}>
                <span>
                  <InputLabel>차량구분</InputLabel>
                  <Select
                    value={info.vehicleType}
                    defaultValue={info.vehicleType}
                    onChange={handleValueChange}
                    name="vehicleType"
                    sx={{
                      width: "10rem",
                    }}
                  >
                    <MenuItem value="25인승 소형">25인승 소형</MenuItem>
                    <MenuItem value="28인승 리무진">28인승 리무진</MenuItem>
                    <MenuItem value="45인승 대형">45인승 대형</MenuItem>
                  </Select>
                </span>
                <span>
                  <InputLabel sx={{ marginLeft: 10 }}>차량대수</InputLabel>
                  <Select
                    value={info.vehicleNumber}
                    defaultValue={info.vehicleNumber}
                    onChange={handleValueChange}
                    name="vehicleNumber"
                    sx={{
                      marginLeft: 10,
                      width: "8rem",
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
                </span>
              </div>
              <TextField
                label="출발일자"
                type="datetime-local"
                name="departDate"
                value={info.departDate}
                onChange={handleValueChange}
                sx={{
                  marginBottom: 2,
                  width: "50%",
                }}
              />
              <TextField
                label="귀행일자"
                type="datetime-local"
                name="arrivalDate"
                value={info.arrivalDate}
                onChange={handleValueChange}
                sx={{
                  marginBottom: 1,
                  width: "50%",
                }}
              />
              <div className={styles.departContainer}>
                <InputLabel>출발지</InputLabel>
                <Select
                  value={info.departPlace}
                  defaultValue={info.departPlace}
                  onChange={handleValueChange}
                  name="departPlace"
                  sx={{
                    width: "7rem",
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
                  label="세부정보"
                  name="departPlaceDetail"
                  value={info.departPlaceDetail}
                  onChange={handleValueChange}
                  autoComplete="off"
                  sx={{
                    marginLeft: 3,
                    width: "60%",
                  }}
                />
              </div>
              <div className={styles.arrivalContainer}>
                <InputLabel>도착지</InputLabel>
                <Select
                  value={info.arrivalPlace}
                  defaultValue={info.arrivalPlace}
                  onChange={handleValueChange}
                  name="arrivalPlace"
                  sx={{
                    width: "7rem",
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
                  label="세부정보"
                  name="arrivalPlaceDetail"
                  value={info.arrivalPlaceDetail}
                  onChange={handleValueChange}
                  autoComplete="off"
                  sx={{
                    marginLeft: 3,
                    width: "60%",
                  }}
                />
              </div>
              <TextField
                label="경유지"
                name="stopPlace"
                value={info.stopPlace}
                onChange={handleValueChange}
                autoComplete="off"
                sx={{
                  marginBottom: 1,
                  width: "60%",
                }}
              />
              <Stack
                direction="row"
                sx={{
                  margin: "0 auto",
                  marginTop: 3,
                }}
                spacing={2}
              >
                <RadioGroup
                  row
                  defaultValue="왕복"
                  onChange={handleValueChange}
                >
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
                <RadioGroup
                  row
                  defaultValue="현금"
                  onChange={handleValueChange}
                >
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
                <RadioGroup
                  row
                  defaultValue={true}
                  onChange={handleValueChange}
                >
                  <FormControlLabel
                    name="taxBill"
                    value="발급"
                    control={<Radio />}
                    label="세금계산서 발급"
                  />
                  <FormControlLabel
                    name="taxBill"
                    value="발급"
                    control={<Radio />}
                    label="발급안함"
                  />
                </RadioGroup>
              </Stack>
              <TextField
                label="기타 메모 사항"
                type="text"
                name="memo"
                variant="outlined"
                onChange={handleValueChange}
                multiline
                minRows={3}
                value={info.memo}
                autoComplete="off"
                sx={{ width: "500px", marginBottom: 2 }}
              />
            </div>
          </section>
          <ol>
            <li className={styles.detailEstimate}>
              견적내용은 문자 메시지로 발송됩니다. 핸드폰 번호를 정확하게
              입력하시기 바랍니다.
            </li>
            <li className={styles.detailEstimate}>
              이메일로 받고자 하실 경우에는 반드시 이메일 주소를 입력하시고 기타
              메모사항에 <br /> [이메일 요청]이라고 기입해 주시기 바랍니다.
            </li>
            <li className={styles.detailEstimate}>
              경유지 또는 목적지 외 인근 지역 운행이 있으면 반드시 기재하여야
              합니다.
            </li>
            <li className={styles.detailEstimate}>
              모든 견적은 부가세 별도입니다.
            </li>
          </ol>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={onSubmit}
              sx={{
                borderRadius: "5px",
                width: "max-content",
                marginRight: "10px",
                backgroundColor: "#FFCC49",
                color: "#5A4231",
                border: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 250, 203, 0.7)",
                  border: "none",
                },
              }}
            >
              견적요청
            </Button>
            <Button
              type="button"
              sx={{
                borderRadius: "5px",
                width: "max-content",
                backgroundColor: "#FFCC49",
                color: "#5A4231",
                border: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 250, 203, 0.7)",
                  border: "none",
                },
              }}
              onClick={props.handleCloseRequestEstimate}
            >
              닫기
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default RequestEstimateSlide;
