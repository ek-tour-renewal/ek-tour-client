import {useState, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import {deleteEstimate, getEstimateDetailById, putEstimateDetail} from '../../api/estimate';
import ModifyForm from '../../components/myEstimate/modifyForm';
import ModifyHeader from '../../components/myEstimate/modifyHeader';

export default function EstimateDetail() {
  const navigate = useNavigate();
  const {estimateId} = useParams();
  const {state} = useLocation();

  const [isOpenModify, setIsOpenModify] = useState(false);
  const [modify, setModify] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg);

  // 서버로부터 받아온 견적요청 상세보기 데이터
  const [originData, setOriginData] = useState(initialEstimate);
  const [originPlace, setOriginPlace] = useState(initialPlaceInfo);
  // 수정 요청용 데이터
  const [modifyData, setModifyData] = useState(initialEstimate);
  const [modifyPlace, setModifyPlace] = useState(initialPlaceInfo);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `이케이하나관광-견적상세내역`;
  }, []);

  // 서버로부터 가져온 데이터 세팅
  useEffect(() => {
    if (!state) {
      navigate(-1);
      throw new Error('잘못된 접근입니다.');
    }

    getEstimateDetailById(estimateId)
      .then((response) => {
        if (!response.hasOwnProperty('id')) navigate('/error');
        setOriginData(response);
        setModifyData(response);
        const placeData = {
          departPlace: response.departPlace.substring(0, 4),
          departPlaceDetail: response.departPlace.substring(4),
          departDate: response.departDate.substring(0, 10),
          departTime: response.departDate.substring(11, 16),
          arrivalPlace: response.arrivalPlace.substring(0, 4),
          arrivalPlaceDetail: response.arrivalPlace.substring(4),
          arrivalDate: response.arrivalDate.substring(0, 10),
          arrivalTime: response.arrivalDate.substring(11, 16)
        }

        setOriginPlace(placeData);
        setModifyPlace(placeData)
      }).catch((error) => {
      console.log(error);
    });
  }, [])

  const validate = () => {
    let flag = true;
    let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (regEmail.test(modifyData.email) === false || modifyData.email.trim().length <= 0) {
      setErrorMsg(prev => ({...prev, email: '이메일 형식에 맞게 입력 해 주세요.'}));
      flag = false;
    } else setErrorMsg(prev => ({...prev, email: ''}));
    if (modifyPlace.departPlaceDetail === '') {
      setErrorMsg(prev => ({...prev, departPlaceDetail: '출발지 세부정보를 입력해 주세요.'}));
      flag = false;
    } else setErrorMsg(prev => ({...prev, departPlaceDetail: ''}));
    if (modifyPlace.arrivalPlaceDetail === '') {
      setErrorMsg(prev => ({...prev, arrivalPlaceDetail: '도착지 세부정보를 입력해 주세요.'}));
      flag = false;
    } else setErrorMsg(prev => ({...prev, arrivalPlaceDetail: ''}));
    if (/^[0-9]+$/.test(modifyData.memberCount) === false || modifyData.memberCount.length <= 0) {
      setErrorMsg(prev => ({...prev, memberCount: '숫자로 입력해 주세요.'}));
      flag = false;
    } else setErrorMsg(prev => ({...prev, memberCount: ''}));
    return flag;
  };

  const openModify = () => {
    if (!validate()) return;
    setIsOpenModify(prev => !prev);
  }

  const handleCloseUpdateDialog = () => {
    openModify();
    setModifyData(originData);
    setModifyPlace(originPlace);
    setModify(false);
  }

  const handleCloseDeleteDialog = () => {
    setIsOpenDelete(false);
  };

  // 견적 삭제
  const onDeleteMyEstimate = () => {
    deleteEstimate(estimateId)
      .then(() => {
        alert('해당 견적을 삭제했습니다.');
        navigate(-1);
      })
      .catch((error) => {
        alert('오류가 발생했습니다. 고객센터로 문의해 주세요.');
        console.error(error);
      });
  }

  const modifyMyEstimate = () => {
    setIsOpenModify(false);
    setModify(prev => !prev);

    if (modify && validate()) {
      let form = {
        ...modifyData,
        departDate: modifyPlace.departDate + 'T' + modifyPlace.departTime,
        arrivalDate: modifyPlace.arrivalDate + 'T' + modifyPlace.arrivalTime,
        departPlace: modifyPlace.departPlace + modifyPlace.departPlaceDetail,
        arrivalPlace: modifyPlace.arrivalPlace + modifyPlace.arrivalPlaceDetail
      }

      putEstimateDetail(estimateId, form)
        .then(() => {
          alert('견적 요청 내용이 수정되었습니다.');
        })
        .catch(error => {
          alert('오류가 발생했습니다. 고객센터로 문의해 주세요.');
          console.error(error);
        })
    }
  }

  const openDelete = () => {
    setIsOpenDelete(prev => !prev);
  }

  const modifyEstimateData = (e) => {
    const {name, value} = e.target;
    setModifyData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const modifyPlaceData = (e) => {
    const {name, value} = e.target;
    setModifyPlace(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <Box sx={{width: '80%', minWidth: '800px', margin: '2em auto'}}>
        <ModifyHeader
          modify={modify}
          openDelete={openDelete}
          modifyMyEstimate={modifyMyEstimate}
          openModify={openModify}
        />

        <ModifyForm
          data={modifyData}
          place={modifyPlace}
          modify={modify}
          errorMsg={errorMsg}
          modifyEstimateData={modifyEstimateData}
          modifyPlaceData={modifyPlaceData}
        />
      </Box>

      {/* 삭제 다이얼로그 */}
      <Dialog open={isOpenDelete} onClose={handleCloseDeleteDialog}>
        <DialogContent>
          <Alert severity='error'>
            <AlertTitle>
              <strong style={{fontSize: 18}}>견적 요청 삭제</strong>
            </AlertTitle>
            정말로 해당 견적 요청을 삭제하시겠습니까?
          </Alert>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
            <Button onClick={onDeleteMyEstimate}>예</Button>
            <Button onClick={handleCloseDeleteDialog}>아니오</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* 수정 다이얼로그 */}
      <Dialog open={isOpenModify} onClose={handleCloseUpdateDialog}>
        <DialogContent>
          <Alert severity='warning'>
            <AlertTitle>
              <strong style={{fontSize: 18}}>견적 요청 수정</strong>
            </AlertTitle>
            작성하신 정보를 반영하여 견적 요청을 수정합니다.
          </Alert>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
            <Button onClick={modifyMyEstimate}>예</Button>
            <Button onClick={handleCloseUpdateDialog}>아니오</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

const initialEstimate = {
  name: '',
  email: '',
  phone: '',
  password: '',
  travelType: '',
  vehicleType: '',
  vehicleNumber: '1',
  memberCount: '',
  departDate: new Date().toISOString().slice(0, 16),
  arrivalDate: new Date().toISOString().slice(0, 16),
  departPlace: '[서울]',
  arrivalPlace: '[서울]',
  memo: '',
  stopPlace: '',
  wayType: '',
  payment: '',
  taxBill: ''
}

const initialPlaceInfo = {
  departPlace: '',
  departPlaceDetail: '',
  departDate: '',
  departTime: '',
  arrivalPlace: '',
  arrivalPlaceDetail: '',
  arrivalDate: '',
  arrivalTime: ''
}

const initialErrorMsg = {
  email: '',
  departPlaceDetail: '',
  arrivalPlaceDetail: '',
  memberCount: ''
}
