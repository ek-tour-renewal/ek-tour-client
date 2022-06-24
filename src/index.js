import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.css';
import App from './app';
import Ektour from './service/ekTour';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://52.79.242.242',
});

const ektour = new Ektour(httpClient);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App ektour={ektour} />
  </React.StrictMode>
);
