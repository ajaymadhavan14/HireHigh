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
      <Box sx={{ bgcolor: "#93BFCF", height: "70vh", display: 'flex', flexDirection: 'row' }}>
          <Typography sx={{width:"50%", textAlign:"center", alignSelf:"center" }}>
            <h1>Find the right job or internship for you</h1>
          </Typography>
          <Typography sx={{width:"50%", alignSelf:"center",textAlign:"center"}}>
           <Button variant="contained" onClick={()=>navigate("/login")}>Click Here</Button>
          </Typography>
      </Box>
    </React.Fragment>
  );
}
