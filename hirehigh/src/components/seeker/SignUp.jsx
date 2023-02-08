
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import swal from 'sweetalert';





const theme = createTheme();

export default function SeekerSignUp() {

  const [firstName,setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')

    const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      phoneNumber: data.get('phoneNumber')
    }
    axios.post('/signup',data).then((response)=>{
      if(response.data.status === 'success'){
          navigate('/login')
       }else{
        swal("OOPS",response.data.message,'error')
       }   
    })
    
  };
    
   
  return (
    <ThemeProvider theme={theme}>
      <Typography sx={{marginLeft:"6%", color: '#6096B4'}}>
            <h2 onClick={()=>navigate("/")} >HIREHIGH</h2>
          </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#6096B4" }}>
            <PersonAddIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  type="number"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                
                <Link onClick={()=>{navigate("/login")}} variant="body2" component="button">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}