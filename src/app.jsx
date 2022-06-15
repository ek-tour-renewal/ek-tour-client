import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import Main from './components/main/main';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
