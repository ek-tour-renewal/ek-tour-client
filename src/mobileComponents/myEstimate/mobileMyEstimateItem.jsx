import { TableCell, TableRow } from "@mui/material";

export default function MobileMyEstimateItem(props) {
  
  return (
    <TableRow>
      <TableCell align='center'>{props.name}</TableCell>
      <TableCell align='center'>{props.travelType}</TableCell>
      <TableCell align='center'>{props.createdDate}</TableCell>
    </TableRow>
  );
}