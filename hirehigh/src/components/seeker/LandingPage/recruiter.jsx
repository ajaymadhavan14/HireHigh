import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';

export default function RecruiterContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ bgcolor: "#66b8fa", height: "70vh", display: 'flex', flexDirection: 'row' }}>
          <Typography sx={{width:"50%", textAlign:"center", alignSelf:"center" }}>
            <h1>Post your job for millions of people to see</h1>
          </Typography>
          <Typography sx={{width:"50%", alignSelf:"center",textAlign:"center"}}>
           <Button variant="contained">Click Here</Button>
          </Typography>
      </Box>
    </React.Fragment>
  );
}
