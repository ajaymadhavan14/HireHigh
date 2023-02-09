import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export default function SeekerContainer() {
    const navigate = useNavigate()
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ bgcolor: "#F1F5F9", height: "70vh", display: 'flex', flexDirection: 'row' }}>
        <Box sx={{width:"50%", alignSelf:"center",textAlign:"center"}}>
        <Typography sx={{fontSize:"10vh"}}>
          Find Your Next 
          </Typography>
          <Typography sx={{fontSize:"10vh"}}>
          Dream Job
          </Typography>
          <Typography >
           <Button variant="contained" onClick={()=>navigate("/login")}>Click Here</Button>
          </Typography>
        </Box>
         <Box sx={{width:"50%", alignSelf:"center",textAlign:"center"}}>
         <img  src="/HH-B.png"
          alt="Loading...">
         </img>
         </Box>
         
      </Box>
    </React.Fragment>
  );
}
