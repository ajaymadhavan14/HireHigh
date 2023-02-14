import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ReProfile() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={4} lg={3} sx={{ bgcolor: 'blueviolet' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <img style={{ width: '10vh', height: '10vh' }} src="/logo192.png" alt="" />

              <Typography>Brototype</Typography>
              <Typography>Brototype</Typography>
              <Typography>Name</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: 'gray' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <label>RECRUITER ID</label>
                  <Typography pt={2}>

                    123456789789456123

                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <label>Email</label>
                  <Typography pt={2}>

                    123456789789456123

                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <label>Phone Number</label>
                  <Typography pt={2}>

                    123456789789456123

                  </Typography>
                </Box>
              </Box>
              <Box sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10vh',
              }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <label>Website</label>
                  <Typography pt={2}>

                    123456789789456123

                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <label>Location</label>
                  <Typography pt={2}>

                    123456789789456123

                  </Typography>
                </Box>

              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10vh' }}>
                <label>TagLine</label>
                <Typography pt={2}>
                  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                </Typography>
              </Box>
              <Button sx={{ bgcolor: 'black', mt: '5vh' }}>
                Edit
              </Button>
            </Box>

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
