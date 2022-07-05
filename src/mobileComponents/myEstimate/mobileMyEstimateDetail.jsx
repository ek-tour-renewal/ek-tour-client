import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function MobileMyEstimateDetail({ ektour }) {

  const navigate = useNavigate();
  const { page, estimateId } = useParams();
  const { state } = useLocation();

  const [form, setForm] = useState({
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

  useEffect(() => {
    if (!state) throw new Error('잘못된 접근입니다.');
    console.log('state', state);
    console.log('estimateId', estimateId);
    ektour.getEstimateDetailByIdAndForm(state.form, estimateId)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {

    });
  }, []);

  return (
    <>

    </>
  );
}