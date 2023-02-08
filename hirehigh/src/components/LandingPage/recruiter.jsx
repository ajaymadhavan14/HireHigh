import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function RecruiterContainer() {
   const navigate = useNavigate()
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ bgcolor: "#BDCDD6", height: "70vh", display: 'flex', flexDirection: 'row' }}>
          <Typography sx={{width:"50%", textAlign:"center", alignSelf:"center" }}>
            <h1>Post your job for millions of people to see</h1>
          </Typography>
          <Typography sx={{width:"50%", alignSelf:"center",textAlign:"center"}}>
           <Button variant="contained" onClick={()=>navigate("/recruiter/login")}>Click Here</Button>
          </Typography>
      </Box>
    </React.Fragment>
  );
}
