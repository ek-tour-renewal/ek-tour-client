class Ektour {
  constructor(httpClient) {
    this.ektour = httpClient;
  }

  // 로고 요청
  async getLogo() {
    const response = await this.ektour.get('/img/logo.png', {
      responseType: 'blob'
    });
    return response;
  }

  // 회사 정보 요청
  // async getCompanyData(data) {
  //   const response = await this.ektour.get('/estimate', {
  //     params: {

  //     },
  //   });
  //   return response;
  // }

  // 견적 요청 (정보 보내기)
  async postData(data) {
    const response = await this.ektour.post('/estimate', data);
    return response;
  }

  // 견적 요청 목록 전체 페이지 요청
  async getAllPageCount() {
    const response = await this.ektour.get('/estimate/all/page',{});
    return response;
  }

  // 견적 목록 요청
  async getData(pageNumber) {
    const response = await this.ektour.get('/estimate/all', {
      params: {
        page: pageNumber,
      },
    });
    return response.data.estimateList;
  }

  // 나의 견적 목록 요청
  async postMyEstimate(data, pageNumber) {
    const { phone, password } = data;
    const response = await this.ektour.post(`/estimate/search/my?page=${pageNumber}`, {
      phone: phone,
      password: password,
    });
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