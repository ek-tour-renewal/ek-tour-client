import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.css';
import App from './app';
import Ektour from './service/ekTour';

const ektour = new Ektour();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App ektour={ektour} />
  </React.StrictMode>
);
