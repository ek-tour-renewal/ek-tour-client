import React from 'react';
import styles from './app.module.css';
import MainPage from './components/main-page/mainPage';

function App() {
  return (
    <div className={styles.app}>
      <MainPage />
    </div>
  );
}

export default App;
