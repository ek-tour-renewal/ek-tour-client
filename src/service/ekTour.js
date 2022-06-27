class Ektour {
  constructor(httpClient) {
    this.ektour = httpClient;
  }

  async getLogo() {
    const response = await this.ektour.get('/img/logo.png', {});
    return response;
  }

  // async getCompanyData(data) {
  //   const response = await this.ektour.get('/estimate', {
  //     params: {

  //     },
  //   });
  //   return response;
  // }

  async postData(data) {
    const response = await this.ektour.post('/estimate', data);
    return response;
  }

  async getAllPageCount() {
    const response = await this.ektour.get('/estimate/all/page',{});
    return response;
  }

  async getData(pageNumber) {
    const response = await this.ektour.get('/estimate/all', {
      params: {
        page: pageNumber,
      },
    });
    return response.data.estimateList;
  }

  async postMyEstimate(data) {
    const { phone, password } = data;
    const response = await this.ektour.post(`/estimate/search/my`, {
      phone: phone,
      password: password,
    });
    return response.data.estimates;
  }

  // async putData(data) {
  //   const response = await this.ektour.put('', data);
  //   return response;
  // }

  // async deleteData(data) {
  //   const response = await this.ektour.put('/estimate/estimateId', {
  //     data,
  // });
  //   return response;
  // }

}

export default Ektour;