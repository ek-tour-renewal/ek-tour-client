import { AppBar, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyEstimateV1 from "../myEstimate/myEstimateV1";
import RequestEstimateSlide from "../requestEstimate/requestEstimateSlide";
import styles from "./header.module.css";

function HeaderButton(props) {
  return (
    <Button
      onClick={props.onClick}
      sx={{
        border: "none",
        backgroundColor: "unset",
        fontSize: "1em",
        fontWeight: "bold",
        color: "#5A4231",
        marginRight: "1em",
        marginBottom: "0.5em",
        transition: "0.5s",
        "&:hover": {
          color: "#EC9F46",
          backgroundColor: "rgba(255, 250, 203, 0.7)",
          transform: "scale(1.02)",
        },
      }}
    >
      {props.buttonText}
    </Button>
  );
}

const Header = (props, { ektour }) => {
  const navigate = useNavigate();

  const [myOpen, setMyOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const handleClickMyEstimate = () => {
    setMyOpen(true);
  };
  const handleCloseMyEstimate = () => {
    setMyOpen(false);
  };
  const handleOpenRequestEstimate = () => {
    setRequestOpen(true);
  };
  const handleCloseRequestEstimate = () => {
    setRequestOpen(false);
  };

  const handleClickMain = () => {
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
      }}
    >
      <nav className={styles.navbar}>
        <span onClick={handleClickMain}>
          <img
            className={styles.logo}
            src='https://ektour.s3.ap-northeast-2.amazonaws.com/static/logo.png'
            alt='EK tour logo'
          />
        </span>
        <nav className={styles.navbarContainer}>
          <ul className={styles.navbarMenu}>
            <li className={styles.myEstimate}>
              <HeaderButton
                buttonText='나의견적확인'
                onClick={handleClickMyEstimate}
              />
              <MyEstimateV1
                ektour={ektour}
                onClose={handleCloseMyEstimate}
                open={myOpen}
                changeDataAndPages={props.changeDataAndPages}
                s
              />
            </li>
          </ul>
        </nav>
      </nav>
    </AppBar>
  );
};

export default Header;
