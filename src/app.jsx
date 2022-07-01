import React, { useState } from 'react';
import styles from './app.module.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';
import Company from './components/company/company';
import BusNotice from './components/busNotice/busNotice';
import EstimateList from './components/estimateList/estimateList';
import RequestEstimate from './components/requestEstimate/requestEstimate';
import ServiceCenter from './components/serviceCenter/serviceCenter';
import NotFoundPage from './components/notFoundPage/notFoundPage';
import SideMenu from './components/sideMenu/sideMenu';


function App({ ektour }) {
  const [mode, setMode] = useState('MAIN');
  const changeMode = (mode) => {
    console.log(mode);
    setMode(mode);
  }
  const [menu, setMenu] = useState(null); //subheader

  let content = null;

  if (mode === 'MAIN') {
    content = <Main

    />
  } else if (mode === 'COMPANY') {
    content = <Company
    
    />
  } else if (mode === 'BUSINFO') {
    content = <BusNotice
    
    />
  } else if (mode === 'ESTIMATELIST') {
    content = <EstimateList
      ektour={ektour}
    />
  } else if (mode === 'REQUESTESTIMATE') {
    content = <RequestEstimate

    />
  } else if (mode === 'SERVICECENTER') {
    content = <ServiceCenter
      
    />
  } else {
    content = <NotFoundPage/>
  }

  return (
    <div className={styles.app}>
      <SideMenu />
      <Header
        changeMode={changeMode}
      />
      
      {content}
      <Footer/>
    </div>
  );
}

export default App;
