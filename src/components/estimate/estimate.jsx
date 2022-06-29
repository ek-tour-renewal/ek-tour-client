import React, { useState, useRef } from "react";
import styles from "./estimate.module.css";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";

const Estimate = ({ Ref, getData }) => {
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
    departPlace: "서울",
    departPlaceDetail: "",
    arrivalPlace: "서울",
    arrivalPlaceDetail: "",
    memo: "",
    stopPlace: "",
    wayType: "",
    payment: "",
    taxBill: "",
  });

  const openDetail = () => {
    setVisible(!visible);
  };

  const onSubmit = (event) => {
    console.log(estimateForm);
    event.preventDefault();
    validate();
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setEstimateForm({
      ...estimateForm,
      [name]: value,
    });
    console.log(estimateForm);
  };

  const [nameErrorMsg, setNameErrorMsg] = useState(null);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [departDateErrorMsg, setDepartDateErrorMsg] = useState(null);
  const [arrivalDateErrorMsg, setArrivalDateErrorMsg] = useState(null);

  const validate = () => {
    if (estimateForm.name === "") setNameErrorMsg("이름을 입력해주세요.");
    else setNameErrorMsg(null);

    if (estimateForm.phone.includes("-"))
      setPhoneErrorMsg(`'-' 빼고 숫자만 입력해주세요.`);
    else if (estimateForm.phone === "" || estimateForm.phone.length < 8)
      setPhoneErrorMsg("연락처를 입력해 주세요.");
    else setPhoneErrorMsg(null);

    if (estimateForm.email === "") setEmailErrorMsg("이메일을 입력해 주세요.");
    else setEmailErrorMsg(null);

    if (estimateForm.password === "" || estimateForm.password.length < 4)
      setPasswordErrorMsg("확인용 비밀번호 4자리를 입력해주세요.");
    else setPasswordErrorMsg(null);

    if (estimateForm.departDate === "")
      setDepartDateErrorMsg("출발일자와 시간을 지정해주세요.");
    else setDepartDateErrorMsg(null);

    if (estimateForm.arrivalDate === "")
      setArrivalDateErrorMsg("귀행일자와 시간을 지정해주세요.");
    else setArrivalDateErrorMsg(null);
  };

  return (
    <section className={styles.estimate}>
      <p className={styles.estimateBox}>실시간 견적요청</p>
      <form className={styles.data} ref={Ref.formRef} onSubmit={onSubmit}>
        <section className={styles.estimate_1}>
          <li className={styles.travel}>
            <InputLabel id="demo-simple-select-helper-label">
              여행구분
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              name="travelType"
              onChange={handleValueChange}
              size="small"
              value={estimateForm.travelType}
              defaultValue={estimateForm.travelType}
            >
              <MenuItem value={"일반여행"}>일반여행</MenuItem>
              <MenuItem value={"관혼상제"}>관혼상제</MenuItem>
              <MenuItem value={"학교단체"}>학교단체</MenuItem>
              <MenuItem value={"기타단체"}>기타단체</MenuItem>
            </Select>
          </li>
          <li className={styles.name}>
            <TextField
              label="이름"
              type="text"
              name="name"
              variant="outlined"
              size="small"
              onChange={handleValueChange}
              error={nameErrorMsg ? true : false}
              helperText={nameErrorMsg}
            />
          </li>
          <li className={styles.phone}>
            <TextField
              label="연락처"
              type="text"
              name="phone"
              variant="outlined"
              size="small"
              onChange={handleValueChange}
              error={phoneErrorMsg ? true : false}
              helperText={phoneErrorMsg}
              inputProps={{ maxLength: 11 }}
            />
          </li>
          <li className={styles.password}>
            <TextField
              label="확인용 비밀번호"
              type="password"
              name="password"
              variant="outlined"
              size="small"
              onChange={handleValueChange}
              error={passwordErrorMsg ? true : false}
              helperText={passwordErrorMsg}
              inputProps={{ maxLength: 4 }}
            />
          </li>
          <li className={styles.email}>
            <TextField
              label="이메일"
              type="email"
              name="email"
              variant="outlined"
              size="small"
              onChange={handleValueChange}
              error={emailErrorMsg ? true : false}
              helperText={emailErrorMsg}
            />
          </li>
          <li className={styles.departDate}>
            <TextField
              label="출발일자"
              type="datetime-local"
              name="departDate"
              InputLabelProps={{ shrink: true }}
              value={estimateForm.departDate}
              onChange={handleValueChange}
              error={departDateErrorMsg ? true : false}
              helperText={departDateErrorMsg}
            />
          </li>
          <li className={styles.arrivalDate}>
            <TextField
              label="귀행일자"
              type="datetime-local"
              name="arrivalDate"
              InputLabelProps={{ shrink: true }}
              onChange={handleValueChange}
              error={arrivalDateErrorMsg ? true : false}
              helperText={arrivalDateErrorMsg}
              value={estimateForm.arrivalDate}
            />
          </li>
          <li className={styles.departPlace}>
            <InputLabel id="departPlace">출발지</InputLabel>
            <Select
              labelId="departPlace"
              name="departPlace"
              onChange={handleValueChange}
              size="small"
              value={estimateForm.departPlace}
              defaultValue={estimateForm.departPlace}
            >
              <MenuItem value={"서울"}>서울</MenuItem>
              <MenuItem value={"경기"}>경기</MenuItem>
              <MenuItem value={"강원"}>강원</MenuItem>
              <MenuItem value={"경북"}>경북</MenuItem>
              <MenuItem value={"경남"}>경남</MenuItem>
              <MenuItem value={"전북"}>전북</MenuItem>
              <MenuItem value={"전남"}>전남</MenuItem>
              <MenuItem value={"제주"}>제주</MenuItem>
              <MenuItem value={"충북"}>충북</MenuItem>
              <MenuItem value={"충남"}>충남</MenuItem>
              <MenuItem value={"광주"}>광주</MenuItem>
              <MenuItem value={"대구"}>대구</MenuItem>
              <MenuItem value={"대전"}>대전</MenuItem>
              <MenuItem value={"부산"}>부산</MenuItem>
              <MenuItem value={"울산"}>인천</MenuItem>
              <MenuItem value={"인천"}>인천</MenuItem>
            </Select>
            <TextField
              label="출발지 상세"
              type="text"
              name="departPlaceDetail"
              variant="outlined"
              size="small"
              sx={{width: "500px"}}
              onChange={handleValueChange}
            />
          </li>
          <li className={styles.arrivalPlace}>
            <InputLabel id="arrivalPlace">도착지</InputLabel>
            <Select
              labelId="arrivalPlace"
              name="arrivalPlace"
              onChange={handleValueChange}
              size="small"
              value={estimateForm.arrivalPlace}
              defaultValue={estimateForm.arrivalPlace}
            >
              <MenuItem value={"서울"}>서울</MenuItem>
              <MenuItem value={"경기"}>경기</MenuItem>
              <MenuItem value={"강원"}>강원</MenuItem>
              <MenuItem value={"경북"}>경북</MenuItem>
              <MenuItem value={"경남"}>경남</MenuItem>
              <MenuItem value={"전북"}>전북</MenuItem>
              <MenuItem value={"전남"}>전남</MenuItem>
              <MenuItem value={"제주"}>제주</MenuItem>
              <MenuItem value={"충북"}>충북</MenuItem>
              <MenuItem value={"충남"}>충남</MenuItem>
              <MenuItem value={"광주"}>광주</MenuItem>
              <MenuItem value={"대구"}>대구</MenuItem>
              <MenuItem value={"대전"}>대전</MenuItem>
              <MenuItem value={"부산"}>부산</MenuItem>
              <MenuItem value={"울산"}>인천</MenuItem>
              <MenuItem value={"인천"}>인천</MenuItem>
            </Select>
            <TextField
              label="도착지 상세"
              type="text"
              name="arrivalPlaceDetail"
              variant="outlined"
              size="small"
              sx={{width: "500px"}}
              onChange={handleValueChange}
            />
          </li>
          <li className={styles.vehicle}>
            <InputLabel id="vehicleType">차량구분</InputLabel>
            <Select
              labelId="vehicleType"
              name="vehicleType"
              onChange={handleValueChange}
              size="small"
              value={estimateForm.vehicleType}
              defaultValue={estimateForm.vehicleType}
            >
              <MenuItem value={"25인승 소형"}>25인승 소형</MenuItem>
              <MenuItem value={"28인승 리무진"}>28인승 리무진</MenuItem>
              <MenuItem value={"45인승 대형"}>45인승 대형</MenuItem>
            </Select>
          </li>
          <li className={styles.vehicleNumber}>
            <TextField
              label="대수"
              type="number"
              name="vehicleNumber"
              variant="outlined"
              size="small"
              onChange={handleValueChange}
              value={estimateForm.vehicleNumber}
              sx={{width: "70px"}}
            /> 대
          </li>
          <li className={styles.memo}>
            <TextField
              label="기타 메모 사항"
              type="text"
              name="memo"
              variant="outlined"
              onChange={handleValueChange}
              multiline
              minRows={3}
              sx={{width: "500px"}}
            />
            {/* <p className={styles.memoTitle}>기타 메모 사항</p>
            <textarea className={styles.memoTextarea} ref={Ref.memoRef} cols='30' rows='10'></textarea> */}
          </li>
          {/* 견적요청 버튼 */}
          {/* <li className={styles.requestButtonContainer} id="innerSubmitButton">
            <button type="submit" className={styles.requestButton}>
              견적요청
            </button>
          </li> */}
        </section>
        {visible && (
          <section className={styles.estimate_2}>
            <li className={styles.stopPlace}>
              <TextField
                label="경유지"
                type="text"
                name="stopPlace"
                variant="outlined"
                onChange={handleValueChange}
                sx={{width: "500px"}}
              />
              {/* <p className={styles.stopPlaceTitle}>경유지</p>
            <input className={styles.placeInput} ref={Ref.stopPlaceRef} type='text' /> */}
            </li>

            <li className={styles.memberCount}>
              <TextField
                label="인원"
                type="text"
                name="memberCount"
                variant="outlined"
                size="small"
                onChange={handleValueChange}
              />{" "}
              명
              {/* <p className={styles.memberCountTitle}>인원</p>
            <input className={styles.memberCountInput} ref={Ref.memberCountRef} type='text' /> */}
            </li>
            <li className={styles.wayType}>
              <p className={styles.wayTypeTitle}>왕복구분</p>
              <label>
                <input
                  className={styles.checkbox}
                  ref={Ref.aroundWayTypeRef}
                  type="radio"
                  name="wayType"
                />
                왕복
                <input
                  className={styles.checkbox}
                  type="radio"
                  name="wayType"
                />
                편도
              </label>
            </li>
            <li className={styles.payment}>
              <p className={styles.paymentTitle}>결제방법</p>
              <input
                className={styles.checkbox}
                ref={Ref.cashRef}
                type="radio"
                name="payType"
              />
              현금
              <input className={styles.checkbox} type="radio" name="payType" />
              카드
            </li>
            <li className={styles.taxBill}>
              <p className={styles.taxBillTitle}>세금계산서 발급</p>
              <input
                className={styles.checkbox}
                ref={Ref.taxBillRef}
                type="radio"
                name="taxBillType"
              />
              발급
              <input
                className={styles.checkbox}
                type="radio"
                name="taxBillType"
              />
              발급안함
            </li>
          </section>
        )}
        {/* 견적요청 버튼 */}
        <Box>
        {/* <li className={styles.requestButtonContainer}> */}
          <button type="submit" className={styles.requestButton}>
            견적요청
          </button>
        {/* </li> */}
        </Box>
        <li className={styles.viewMore}>
          <button
            className={styles.moreButton}
            ref={buttonRef}
            type="button"
            onClick={openDetail}
          >
            {visible ? (buttonRef.current.value = "간략요청") : "상세요청"}
          </button>
        </li>
      </form>
    </section>
  );
};

export default Estimate;
