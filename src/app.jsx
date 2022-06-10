import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import Detail from './components/detail/detail';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
