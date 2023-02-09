
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function MiddleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{  height: "45vh", textAlign:"center",mt:5 }}>
       
        <Typography sx={{pt:4,fontSize:"10vh",color:"#000DFF"}} >
            1000+
          </Typography>
          <Typography  sx={{fontSize:"5vh"}} >
            Browse From Our Top Jobs
          </Typography>
       
      </Box>
    </React.Fragment>
  );
}
