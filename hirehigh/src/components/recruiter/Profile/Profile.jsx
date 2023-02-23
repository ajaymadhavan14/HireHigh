/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../../apis/RecruiterApi';

export default function RecruiterProfile(props) {
  const theme = createTheme();
  const [recruiter, setRecruiter] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function invoke() {
      console.log(props, 'hello');
      // eslint-disable-next-line max-len
      // eslint-disable-next-line no-underscore-dangle, react/destructuring-assignment, react/prop-types
      const id = props.id._id;
      const res = await getProfile(id);
      setRecruiter(res);
    }
    invoke();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}

          <Grid item xs={12} md={4} lg={3} sx={{ }}>
            <Paper sx={{ width: '100%', height: '100%' }}>
              <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', p: '3vh',
              }}
              >

                <img style={{ width: '15vh', height: '20vh' }} src={recruiter?.image} alt="" />

                <Typography sx={{ fontSize: '3vh', fontWeight: '500' }}>{recruiter?.userName}</Typography>
                <Box mt={4}>
                  <FormLabel>Discription</FormLabel>
                  <Typography>{recruiter?.discription}</Typography>
                </Box>
              </Box>

            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: '3vh' }}>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>RECRUITER ID</FormLabel>
                    <Typography pt={1}>

                      #
                      {recruiter?._id}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Company Name</FormLabel>
                    <Typography pt={1}>

                      {recruiter?.companyName}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Phone Number</FormLabel>
                    <Typography pt={1}>

                      {recruiter?.phoneNumber}

                    </Typography>
                  </Box>
                </Box>

                <Box sx={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10vh',
                }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Email</FormLabel>
                    <Typography pt={1}>

                      {recruiter?.email}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <FormLabel>Website</FormLabel>
                    <Typography pt={1}>

                      {recruiter?.website}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Location</FormLabel>
                    <Typography pt={1}>

                      {recruiter?.Location}

                    </Typography>
                  </Box>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10vh' }}>
                  <FormLabel>TagLine</FormLabel>
                  <Typography pt={1}>
                    {recruiter?.tagLine}
                  </Typography>
                </Box>
                <Button variant="contained" sx={{ mt: '5vh', width: '10vh', alignSelf: 'end' }} onClick={() => navigate('/recruiter/edit_profile')}>
                  Edit
                </Button>
              </Box>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} />
          </Grid>
        </Grid>
      </Container>

    </ThemeProvider>
  );
}
