class Ektour {
  constructor(httpClient) {
    this.ektour = httpClient;
  }

  // 회사 정보 요청
  async getCompanyInfo() {
    const response = await this.ektour.get('/admin/info', {});
    return response.data;
  }

  // 견적 요청 (정보 보내기)
  async createEstimate(data) {
    const response = await this.ektour.post('/estimate', data);
    return response.data;
  }

  // 견적 요청 목록 전체 페이지 수 요청
  async getTotalPageNum() {
    const response = await this.ektour.get('/estimate/all/page');
    return response.data.totalCount;
  }

  // 페이지로 견적 리스트 조회
  async getEstimateListByPage(pageNumber) {
    const response = await this.ektour.get('/estimate/all', {
      params: {
        page: pageNumber - 1,
      },
    });
    return response.data.estimateList;
  }

  // 등록자의 핸드폰 번호와 패스워드 확인 후 유효하면 해당 등록자의 견적 요청 목록 반환
  async getMyEstimateListByForm(form, pageNumber) {
    const { phone, password } = form;
    const response = await this.ektour.post(`/estimate/search/my?page=${pageNumber - 1}`, {
      phone: phone,
      password: password,
    });
    return response.data;
  }

  // 견적 ID로 견적 요청 상세 조회
  async getEstimateDetailByEstimateId(estimateId) {
    const response = await this.ektour.get(`/${estimateId}`);
    return response.data;
  }

  // 나의 견적 정보 수정 요청
  // async putData(data) {
  //   const response = await this.ektour.put('', data);
  //   return response;
  // }

  // 나의 견적 정보 삭제 요청
  // async deleteData(data) {
  //   const response = await this.ektour.put('/estimate/estimateId', {
  //     data,
  // });
  //   return response;
  // }

}

export default Ektour;