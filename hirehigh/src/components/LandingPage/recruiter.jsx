import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function RecruiterContainer() {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <Box sx={{
        bgcolor: '#F1F5F9', height: '70vh', display: 'flex', flexDirection: 'row',
      }}
      >

        <Box sx={{ width: '50%', alignSelf: 'center', textAlign: 'center' }}>
          <img
            src="/HH-B-R.png"
            alt="Loading..."
            style={{ height: '60vh' }}
          />
        </Box>

        <Box sx={{ width: '50%', alignSelf: 'center', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '8vh' }}>
            We Build Lasting
            <br />
            Relationships Between
            <br />
            Candidates & Businesses
          </Typography>

          <Typography sx={{ mt: 3 }}>
            <Button variant="contained" onClick={() => navigate('/recruiter/login')}>Click Here</Button>
          </Typography>
        </Box>

      </Box>
    </>
  );
}
