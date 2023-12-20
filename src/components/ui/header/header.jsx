import React, { useState } from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { AppBar, Button } from "@mui/material";
import HeaderButton from "./headerButton";
import MyEstimateForm from "../../estimate/myEstimateForm";

const Header = (props) => {
  const navigate = useNavigate();

  const [myOpen, setMyOpen] = useState(false);

  const onClickMyEstimate = () => {
    setMyOpen((prev) => !prev);
  };

  const onClickMain = () => {
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        borderTop: "4px solid #EC9F46",
        backgroundColor: "#FCFCFC",
        userSelect: "none",
        position: "sticky",
        top: 0,
        paddingBottom: "2em",
        flexDirection: "row",
        pt: "1em",
      }}
    >
      <Button onClick={onClickMain}>
        <img
          className={styles.logo}
          src='https://ektour.s3.ap-northeast-2.amazonaws.com/static/logo.png'
          alt='EK tour logo'
        />
      </Button>

      <nav className={styles.navbarContainer}>
        <div className={styles.navbarMenu}>
          <HeaderButton buttonText='나의견적확인' onClick={onClickMyEstimate} />
          <MyEstimateForm
            onClose={onClickMyEstimate}
            open={myOpen}
            changeDataAndPages={props.changeDataAndPages}
          />
        </div>
      </nav>
    </AppBar>
  );
};

export default Header;
