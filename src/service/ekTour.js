import axios from 'axios';

class Ektour {
  constructor() {
    this.ektour = axios.create({
      baseURL: `#`,
    });
  }

  async pushData(data) {
    const response = await this.ektour.post('/estimate', data);
    return response;
  }

  async RequestData(pageNumber) {
    const response = await this.ektour.get('/all', {
      params: {
        page: pageNumber,
      },
    });
    return response;
  }
}

export default Ektour;