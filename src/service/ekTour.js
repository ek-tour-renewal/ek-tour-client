class Ektour {
  constructor(httpClient) {
    this.ektour = httpClient;
  }

  async pushData(data) {
    const response = await this.ektour.post('/estimate', data);
    return response;
  }

  async updateData(data) {
    const response = await this.ektour.put('/estimate/search/my', data);
    return response;
  }

  async getAllPageCount() {
    const response = await this.ektour.get('/estimate/all/page',{});
    return response;
  }

  async requestData(pageNumber) {
    const response = await this.ektour.get('/estimate/all', {
      params: {
        page: pageNumber,
      },
    });
    return response.data.estimateList;
  }

  async getMyEstimate(data) {
    const { phone, password } = data;
    const response = await this.ektour.post(`/estimate/search/my`, {
      phone: phone,
      password: password,
    });
    return response.data.estimates;
  }
}

export default Ektour;