/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../../apis/SeekerApi';

export default function SeekerProfile() {
  const theme = createTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    async function invoke() {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line no-underscore-dangle, react/destructuring-assignment, react/prop-types
      const res = await getProfile(token);
      setUser(res);
    }
    invoke();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}

          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={{ width: '100%', height: '100%' }}>
              <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', p: '3vh',
              }}
              >

                <img style={{ width: '15vh', height: '20vh' }} src={user?.image} alt="" />

                <Typography sx={{ fontSize: '3vh', fontWeight: '500' }}>{`${user?.firstName} ${user?.lastName}`}</Typography>
                <Box mt={4}>
                  <FormLabel>Discription</FormLabel>
                  <Typography>{user?.discription}</Typography>
                </Box>
              </Box>

            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: '3vh' }}>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>user ID</FormLabel>
                    <Typography pt={1}>

                      #
                      {user?._id}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Email</FormLabel>
                    <Typography pt={1}>

                      {user?.email}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Phone Number</FormLabel>
                    <Typography pt={1}>

                      {user?.phoneNumber}

                    </Typography>
                  </Box>
                </Box>

                <Box sx={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10vh',
                }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Location</FormLabel>
                    <Typography pt={1}>

                      {user?.location}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <FormLabel>Age</FormLabel>
                    <Typography pt={1}>

                      {user?.age}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>CTC</FormLabel>
                    <Typography pt={1}>

                      {user?.salaryRange}

                    </Typography>
                  </Box>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10vh' }}>
                  <FormLabel>headLine</FormLabel>
                  <Typography pt={1}>
                    {user?.headline}
                  </Typography>
                </Box>
                <Button variant="contained" sx={{ mt: '5vh', width: '10vh', alignSelf: 'end' }} onClick={() => navigate('/edit_profile')}>
                  Edit
                </Button>
              </Box>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          {/* Recent Orders */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Qualification</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {user?.qualification}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginTop: '5vh' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Experiance</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {user?.experiance}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>

    </ThemeProvider>
  );
}
