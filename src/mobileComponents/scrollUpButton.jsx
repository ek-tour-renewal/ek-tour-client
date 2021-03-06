import { Fab, Fade } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { useEffect } from "react";

export default function ScrollUpButton() {

  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => { 
    setScroll(window.pageYOffset);
    if (scroll > 600) setShow(true);
    else setShow(false);
  }

  const handleClickButton = () => {
    window.scrollTo({ top: 205, behavior: 'smooth' });
    setScroll(205);
  }

  useEffect(() => {
    if (scroll > 600) setShow(true);
  }, [scroll]);


  useEffect(() => {
    const watch = () => window.addEventListener('scroll', handleScroll);
    watch();
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <Fade in={show}>
      <Fab variant='extended'
        color='secondary'
        sx={{ position: 'fixed', bottom: 30, right: 10 }} 
        onClick={handleClickButton}>
        <EditIcon />&nbsp;<strong>견적 요청하기</strong>
      </Fab>
    </Fade>
  );
}