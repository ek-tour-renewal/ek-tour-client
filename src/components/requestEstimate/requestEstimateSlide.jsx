import { Drawer, Typography, Grid, Box, ButtonGroup, Button, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SubHeader from '../subHeader/subHeader';
import styles from './requestEstimateSlide.module.css';

const RequestEstimateSlide = (props) => {
  const [info, setInfo] = useState({
    name: null,
    email: null,
    phone: null,
    password: null,
    travelType: '일반여행',
    vehicleType: '25인승 소형',
    vehicleNumber: '1',
    memberCount: null,
    departDate: new Date().toISOString().slice(0, 16),
    departTime: new Date().toISOString().slice(0, 16),
    arrivalDate: null,
    arrivalTime: null,
    departPlace: '[서울]',
    departPlaceDetail: null,
    arrivalPlace: '[서울]',
    arrivalPlaceDetail: null,
    memo: null,
    stopPlace: null,
    around: null,
    oneWay: null,
    cash: null,
    card: null,
    taxBill: null,
    nonTaxBill: null
  });

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
      [name]: value
    });
  }

  const onSubmit = event => {
    console.log('submit');
    // props.getData(event);
    // props.handleCloseRequestEstimate(false);
  };

  return (
    <Drawer
      anchor='left'
      open={props.open}
      onClose={props.handleCloseRequestEstimate}
    >
      <header className={styles.header}>
        <Typography
          sx={{
            width: '100%',
            color: '#FCFCFC',
            backgroundColor: '#EC9F46',
            textAlign: 'center',
            padding: '1rem 0',
            fontSize: '1.5em',
            fontWeight: 'bold',
            borderRadius: '1rem'
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
                label='신청자명'
                onChange={handleValueChange}
                name='name'
              />
              <TextField
                label='이메일 주소'
                onChange={handleValueChange}
                name='email'
                sx={{
                  marginLeft: 10
                }}
              />
            </div>
            <div className={styles.personalDataContainer}>
              <TextField
                label='핸드폰'
                inputProps={{ maxLength: 11 }}
                onChange={handleValueChange}
                name='phone'
              />
              <TextField
                label='비밀번호'
                inputProps={{ maxLength: 4 }}
                onChange={handleValueChange}
                name='password'
                sx={{
                  marginLeft: 10
                }}
              />
            </div>
          </section>
          <ol>
            <li className={styles.detailEstimate}>비밀번호는 4자리 숫자로 입력해 주세요.</li>
            <li className={styles.detailEstimate}>핸드폰 번호와 비밀번호는 견적 내용 확인시 필요합니다.</li>
            <li className={styles.detailEstimate}>경유지가 있거나 기타 요구사항이 있으시면 정확한 견적을 위해 반드시 <br /> 기입해 주시기 바랍니다.</li>
          </ol>
          <section className={styles.detailDataContainer}>
            <div className={styles.detailData}>
            <div className={styles.travelContainer}>
              <InputLabel>여행구분</InputLabel>
              <Select
                value={info.travelType}
                defaultValue={info.travelType}
                onChange={handleValueChange}
                name='travelType'>
                <MenuItem value='일반여행'>일반여행</MenuItem>
                <MenuItem value='관혼상제'>관혼상제</MenuItem>
                <MenuItem value='학교단체'>학교단체</MenuItem>
                <MenuItem value='기타단체'>기타단체</MenuItem>
              </Select>
              <TextField
                label='인원'
                onChange={handleValueChange}
                name='memberCount'
                sx={{
                  marginLeft: 10,
                  marginRight: 1,
                  width: '7rem'
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
                  name='vehicleType'
                  sx={{
                    width: '10rem'
                  }}>
                  <MenuItem value='25인승 소형'>25인승 소형</MenuItem>
                  <MenuItem value='28인승 리무진'>28인승 리무진</MenuItem>
                  <MenuItem value='45인승 대형'>45인승 대형</MenuItem>
                </Select>
              </span>
              <span>
                <InputLabel sx={{ marginLeft: 10 }}>차량대수</InputLabel>
                <Select
                  value={info.vehicleNumber}
                  defaultValue={info.vehicleNumber}
                  onChange={handleValueChange}
                  name='vehicleNumber'
                  sx={{
                    marginLeft: 10,
                    width: '8rem'
                  }}
                >
                  <MenuItem value='1'>1대</MenuItem>
                  <MenuItem value='2'>2대</MenuItem>
                  <MenuItem value='3'>3대</MenuItem>
                  <MenuItem value='4'>4대</MenuItem>
                  <MenuItem value='5'>5대</MenuItem>
                  <MenuItem value='6'>6대</MenuItem>
                  <MenuItem value='7'>7대</MenuItem>
                  <MenuItem value='8'>8대</MenuItem>
                  <MenuItem value='9'>9대</MenuItem>
                  <MenuItem value='10'>10대 이상</MenuItem>
                </Select>
              </span>
            </div>
            <TextField
              label='출발일자'
              type='datetime-local'
              name='departDate'
              value={info.departDate}
              onChange={handleValueChange}
              sx={{
                marginBottom: 2,
                width: '50%'
              }}
            />
            <TextField
              label='귀행일자'
              type='datetime-local'
              name='arrivalDate'
              value={info.departDate}
              onChange={handleValueChange}
              sx={{
                marginBottom: 1,
                width: '50%'
              }}
            />
            <div className={styles.departContainer}>
              <InputLabel>출발지</InputLabel>
              <Select
                value={info.departPlace}
                defaultValue={info.departPlace}
                onChange={handleValueChange}
                name='departPlace'
                sx={{
                  width: '7rem'
                }}>
                <MenuItem value='[서울]'>서울</MenuItem>
                <MenuItem value='[경기]'>경기</MenuItem>
                <MenuItem value='[강원]'>강원</MenuItem>
                <MenuItem value='[경상]'>경북</MenuItem>
                <MenuItem value='[경상]'>경남</MenuItem>
                <MenuItem value='[전라]'>전북</MenuItem>
                <MenuItem value='[전라]'>전남</MenuItem>
                <MenuItem value='[제주]'>제주</MenuItem>
                <MenuItem value='[충청]'>충북</MenuItem>
                <MenuItem value='[충청]'>충남</MenuItem>
                <MenuItem value='[광주]'>광주</MenuItem>
                <MenuItem value='[대구]'>대구</MenuItem>
                <MenuItem value='[대전]'>대전</MenuItem>
                <MenuItem value='[부산]'>부산</MenuItem>
                <MenuItem value='[울산]'>울산</MenuItem>
                <MenuItem value='[인천]'>인천</MenuItem>
              </Select>
              <TextField
                label='세부정보'
                name='departPlaceDetail'
                value={info.departPlaceDetail}
                onChange={handleValueChange}
                sx={{
                  marginLeft: 3,
                  width: '60%'
                }}
              />
            </div>
            <div className={styles.arrivalContainer}>
              <InputLabel>도착지</InputLabel>
              <Select
                value={info.arrivalPlace}
                defaultValue={info.arrivalPlace}
                onChange={handleValueChange}
                name='arrivalPlace'
                sx={{
                  width: '7rem'
                }}>
                <MenuItem value='[서울]'>서울</MenuItem>
                <MenuItem value='[경기]'>경기</MenuItem>
                <MenuItem value='[강원]'>강원</MenuItem>
                <MenuItem value='[경상]'>경북</MenuItem>
                <MenuItem value='[경상]'>경남</MenuItem>
                <MenuItem value='[전라]'>전북</MenuItem>
                <MenuItem value='[전라]'>전남</MenuItem>
                <MenuItem value='[제주]'>제주</MenuItem>
                <MenuItem value='[충청]'>충북</MenuItem>
                <MenuItem value='[충청]'>충남</MenuItem>
                <MenuItem value='[광주]'>광주</MenuItem>
                <MenuItem value='[대구]'>대구</MenuItem>
                <MenuItem value='[대전]'>대전</MenuItem>
                <MenuItem value='[부산]'>부산</MenuItem>
                <MenuItem value='[울산]'>울산</MenuItem>
                <MenuItem value='[인천]'>인천</MenuItem>
              </Select>
              <TextField
                label='세부정보'
                name='arrivalPlaceDetail'
                value={info.arrivalPlaceDetail}
                onChange={handleValueChange}
                sx={{
                  marginLeft: 3,
                  width: '60%'
                }}
              />
            </div>
            <TextField
              label='경유지'
              name='stopPlace'
              value={info.stopPlace}
              onChange={handleValueChange}
              sx={{
                marginBottom: 1,
                width: '60%'
              }}
            />
            <Box
              sx={{
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <div>
                <InputLabel>왕복구분</InputLabel>
                <ButtonGroup>
                  <Button
                    onChange={handleValueChange}
                    name='around'
                    sx={{
                      color: '#5A4231',
                      borderColor: '#D3D3D3',
                      '&:hover': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC',
                        borderColor: '#D3D3D3'
                      },
                      '&:focus': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC'
                      }
                    }}
                    >
                    왕복
                  </Button>
                  <Button
                    onChange={handleValueChange}
                    name='oneWay'
                    sx={{
                      color: '#5A4231',
                      borderColor: '#D3D3D3',
                      '&:hover': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC',
                        borderColor: '#D3D3D3'
                      },
                      '&:focus': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC'
                      }
                    }}
                    >
                    편도
                  </Button>
                </ButtonGroup>
              </div>
              <div>
                <InputLabel>결제방법</InputLabel>
                <ButtonGroup>
                  <Button
                    onChange={handleValueChange}
                    name='cash'
                    sx={{
                      color: '#5A4231',
                      borderColor: '#D3D3D3',
                      '&:hover': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC',
                        borderColor: '#D3D3D3'
                      },
                      '&:focus': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC'
                      }
                    }}
                    >
                    현금
                  </Button>
                  <Button
                    onChange={handleValueChange}
                    name='card'
                    sx={{
                      color: '#5A4231',
                      borderColor: '#D3D3D3',
                      '&:hover': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC',
                        borderColor: '#D3D3D3'
                      },
                      '&:focus': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC'
                      }
                    }}
                    >
                    카드
                  </Button>
                </ButtonGroup>
              </div>
              <div>
                <InputLabel>세금계산서 발급</InputLabel>
                <ButtonGroup>
                  <Button
                    onChange={handleValueChange}
                    name='taxBill'
                    sx={{
                      color: '#5A4231',
                      borderColor: '#D3D3D3',
                      '&:hover': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC',
                        borderColor: '#D3D3D3'
                      },
                      '&:focus': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC'
                      }
                    }}
                    >
                    발급
                  </Button>
                  <Button
                    onChange={handleValueChange}
                    name='nonTaxBill'
                    sx={{
                      color: '#5A4231',
                      borderColor: '#D3D3D3',
                      '&:hover': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC',
                        borderColor: '#D3D3D3'
                      },
                      '&:focus': {
                        backgroundColor: '#EC9F46',
                        color: '#FCFCFC'
                      }
                    }}
                    >
                    발급안함
                  </Button>
                </ButtonGroup>
              </div>
            </Box>
            <TextField
              label='기타 메모 사항'
              type='text'
              name='memo'
              variant='outlined'
              onChange={handleValueChange}
              multiline
              minRows={3}
              sx={{ width: '500px', marginBottom: 2 }}
            />
            </div>
          </section>
          <ol>
            <li className={styles.detailEstimate}>견적내용은 문자 메시지로 발송됩니다. 핸드폰번호를 정확하게 입력하시기 바랍니다.</li>
            <li className={styles.detailEstimate}>이메일로 받고자 하실 경우에는 반드시 이메일 주소를 입력하시고 기타 메모사항에 <br /> [이메일 요청]이라고 기입해 주시기 바랍니다.</li>
            <li className={styles.detailEstimate}>경유지 또는 목적지 외 인근 지역 운행이 있으면 반드시 기재하여야 합니다.</li>
            <li className={styles.detailEstimate}>모든 견적은 부가세 별도입니다.</li>
          </ol>
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              marginRight: '10px',
              marginTop: '10px'
            }}>
            <Button
              onClick={onSubmit}
              sx={{
                borderRadius: '5px',
                width: 'max-content',
                marginRight: '10px',
                backgroundColor: '#FFCC49',
                color: '#5A4231',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 250, 203, 0.7)',
                  border: 'none'
                }
              }}>
              견적요청
            </Button>
            <Button
              type='button'
              sx={{
                borderRadius: '5px',
                width: 'max-content',
                backgroundColor: '#FFCC49',
                color: '#5A4231',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 250, 203, 0.7)',
                  border: 'none'
                }
              }}
              onClick={props.handleCloseRequestEstimate}>
              닫기
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
};

export default RequestEstimateSlide;
