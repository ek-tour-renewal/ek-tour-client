import axios from 'axios';

// 견적 요청 (정보 보내기)
export async function createEstimate(data) {
  await axios.post('/estimate', data);
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

// 나의 견적 요청 목록 조회
export async function getMyEstimateList(form, pageNumber) {
  const response = await axios.post(`/estimate/search/my${pageNumber ? `/all?page=${pageNumber-1}` : ''}`, form);
  return response.data;
}

// 견적 요청 상세 조회
export async function getEstimateDetail(form, estimateId) {
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
  const response = await axios.delete(`/estimate/${estimateId}`);
  return response;
}