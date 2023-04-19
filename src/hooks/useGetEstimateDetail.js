import {getEstimateDetailById} from "../api/estimate";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function useGetEstimateDetail(estimateId) {
  const navigate = useNavigate();

  const [estimateData, setEstimateData] = useState({
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
    taxBill: '',
  });

  useEffect(() => {
    getEstimateDetailById(estimateId)
      .then((response) => {
        if (!response.hasOwnProperty('id')) navigate('/error');
        setEstimateData(response);

        let dp = response.departPlace.substring(0, 4);
        let dpd = response.departPlace.substring(4);
        let dd = response.departDate.substring(0, 10);
        let dt = response.departDate.substring(11, 16);
        let ap = response.arrivalPlace.substring(0, 4);
        let apd = response.arrivalPlace.substring(4);
        let ad = response.arrivalDate.substring(0, 10);
        let at = response.arrivalDate.substring(11, 16);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return estimateData
}