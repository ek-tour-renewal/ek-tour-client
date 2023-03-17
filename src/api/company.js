import axios from 'axios';

// 회사 정보 요청
export async function getCompanyInfo() {
  const {data} = await axios.get('/admin/info', {})

  return data;
}