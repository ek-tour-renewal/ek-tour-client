import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import MainPage from './components/main-page/mainPage';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
