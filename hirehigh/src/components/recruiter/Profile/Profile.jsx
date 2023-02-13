import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export default function ReProfile() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid display="flex" flexDirection="row" xs={12} container spacing={2}>
          <Grid item xs={4} sx={{ bgcolor: 'black', width: '50vh' }} />
          <Grid item xs={8} sx={{ bgcolor: 'blue', width: '80vh' }}>
            <Grid sx={{ height: '40vh', bgcolor: 'white' }} />
            <Grid sx={{ height: '60vh', bgcolor: 'red' }} />
          </Grid>
        </Grid>
      </Container>

    </ThemeProvider>
  );
}
