import { Divider, Grid, ListItem, ListItemButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function MobileMyEstimateItem(props) {

  const navigate = useNavigate();
  const { state } = useLocation();
  const { page } = useParams();
  
  const handleClickItem = () => {
    navigate(`/mobile/myestimate/list/${page}/${props.id}`, { state: { 
      form: state.form
    }});
  }
  
  return (
    <>
    <ListItem sx={{height: '2em', padding: 0}}>
      <ListItemButton onClick={handleClickItem}>
        <Grid container>
          <Grid item xs={3} sx={{fontSize: '0.8rem'}}>{props.name}</Grid>
          <Grid item xs={4} sx={{fontSize: '0.8rem'}}>{props.travelType}</Grid>
          <Grid item xs={5} sx={{fontSize: '0.8rem'}}>{props.createdDate}</Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
    <Divider />
    </>
  );
}