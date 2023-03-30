import React from "react";
import {Button} from "@mui/material";

export default function HeaderButton(props) {
  return (
    <Button
      onClick={props.onClick}
      sx={{
        border: 'none',
        backgroundColor: 'unset',
        fontSize: '1em',
        fontWeight: 'bold',
        color: '#5A4231',
        marginRight: '1em',
        marginBottom: '0.5em',
        transition: '0.5s',
        '&:hover': {
          color: '#EC9F46',
          backgroundColor: 'rgba(255, 250, 203, 0.7)',
          transform: 'scale(1.02)',
        }
      }}>
      {props.buttonText}
    </Button>
  );
}