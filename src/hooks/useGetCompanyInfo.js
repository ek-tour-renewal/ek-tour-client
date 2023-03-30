import {useEffect, useState} from 'react';
import {getCompanyInfo} from "../api/company";

export default function useGetCompanyInfo() {
  const [companyData, setCompanyData] = useState({
    adminName: null,
    infoHandlerName: null,
    businessNum: null,
    registrationNum: null,
    address: null,
    tel: null,
    fax: null,
    phone: null,
    email: null,
    accountBank: null,
    accountNum: null,
    accountHolder: null,
    kakaoTalkId: null,
  });

  useEffect(() => {
    getCompanyInfo()
      .then(response => setCompanyData(response))
      .catch(console.log)
  }, [])

  return companyData;
}