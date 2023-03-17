import {Fab, Tooltip, Zoom} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import React, {useState} from "react";
import Inquiry from "./inquiry";

export default function InquiryButton(props) {
  const [openCenter, setOpenCenter] = useState(false);

  const handleClickServiceCenterDetail = () => {
    setOpenCenter(prev => !prev)
  };

  return (
    <>
    <Tooltip
      arrow
      title='상담문의 01063876086'
      placement='left'
      TransitionComponent={Zoom}>
      <Fab
        onClick={handleClickServiceCenterDetail}
        variant='extended'
        sx={{
          position: 'fixed',
          right: '2%',
          bottom: '6%',
          backgroundColor: '#5A4231',
          color: '#FCFCFC',
          fontSize: '1.3em',
          p: '1em',
          transition: '1s',
          '&:hover': {
            backgroundColor: '#FFFACB',
            color: '#5A4231',
            transform: 'scale(1.02)'
          }
        }}>
        상담문의&nbsp;&nbsp;
        <ChatIcon sx={{marginLeft: '5px', fontSize: '1.3em'}}/>
      </Fab>
    </Tooltip>

      <Inquiry open={openCenter} companyData={props.companyData} handleClick={handleClickServiceCenterDetail}/>
    </>
  )
}