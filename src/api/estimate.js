import axios from 'axios';

// 견적 요청 (정보 보내기)
export async function createEstimate(data) {
  const response = await axios.post('/estimate', data);
  return response.data;
}

// 페이지로 견적 리스트 조회
export async function getEstimateListByPage(pageNumber) {
  let response;
  try {
    response = await axios.get('/estimate/all', {
      params: {
        page: pageNumber - 1,
      },
    });
  } catch (error) {
    console.log(error)
  }

  return response.data;
}

// 등록자의 핸드폰 번호와 패스워드 확인 후 유효하면 해당 등록자의 견적 요청 목록 반환
export async function getMyEstimateListByFormAndPage(form, pageNumber) {
  const {phone, password} = form;
  const response = await axios.post(`/estimate/search/my/all?page=${pageNumber - 1}`, {
    phone: phone,
    password: password,
  });
  return response.data;
}

// 견적 ID, 요청 폼으로 견적 요청 상세 조회
export async function getEstimateDetailByIdAndForm(form, estimateId) {
  const response = await axios.post(`/estimate/${estimateId}`, form);
  return response.data;
}

// 견적 ID로 견적 요청 상세 조회
export async function getEstimateDetailById(estimateId) {
  const response = await axios.get(`/estimate/${estimateId}`);
  return response.data;
}

// 나의 견적 정보 수정 요청
export async function putEstimateDetail(estimateId, form) {
  const response = await axios.put(`/estimate/${estimateId}`, form);
  return response.data;
}

// 나의 견적 정보 삭제 요청
export async function deleteEstimate(estimateId) {
  const response = await axios.put(`/estimate/${estimateId}`);
  return response;
}