
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect} from 'react';
import {useState} from 'react'
import axios from '../../axios/axios';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'By signing up, you agree to our terms and privacy policy. You must be at least 18 years old to start a page.'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme({
    typography: {
     "fontFamily":'sans-serif'
    }
 });

export default function ASignIn() {

    const navigate = useNavigate()

  const [email,setEmail] = useState(false)
  const [emailErr,setEmailErr] = useState('')
  const [password,setPassword] = useState(false)
  const [passwordErr,setPasswordErr] = useState('')
  const [required ,setRequired] = useState('')

 

  const handleSubmit = async (event) => {
    try {
      
      event.preventDefault();
      
      const data = new FormData(event.currentTarget);
      let signinData = {
        email: data.get('email'),
        password: data.get('password'),
      };
      if(!signinData.email || !signinData.password){
        setRequired('All feilds are required')
        return;
      }
      let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
      setRequired('');
      if(!regEmail.test(signinData.email.toString())){
        setEmail(true)
        setEmailErr('Enter a valid email address')
      } 
      if(signinData.password.length <= 5) {
        setPassword(true)
        setPasswordErr('Password must be at least 6 characters')
      }
      
       axios.post('/admin/login',signinData).then((response)=>{
        if(!response.data.auth){
            swal('sorry',response.data.message,'error')
          }else{
            localStorage.setItem("token",response.data.token)
             navigate('/admin/home')
          }
       })
       
    } catch (err) {
      console.log(err);
      
      
    }
  };

  return (
    <ThemeProvider theme={theme}>
        <Typography component="h1" variant="h4" sx={{fontWeight:'600',ml:5,mt:5,color:'#6096B4'}}>
            HIREHIGH
          </Typography>
      <Container component="main" maxWidth="xs">
        
        <CssBaseline />
       
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          <Typography component="h1" variant="h4" sx={{fontWeight:'600'}}>
            Welcome to ADMIN
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {required && <Typography mb={0.5} sx={{color:'red',fontFamily:'sans-serif'}} align='center'>{required}</Typography>}
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={email}
                  helperText={emailErr}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},//styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": { borderColor: "#f22c50" }},
                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                  }}
                  
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
                  error={password}
                  helperText={passwordErr}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3,
                    mb: 2 ,
                    borderRadius:'20px',
                    height:'42px',
                    backgroundColor:'#6096B4',
                    "&:hover": { backgroundColor: "#347aeb"},
                    textTransform: 'none',
                   
                }}
            >
              SIGN IN
            </Button>
         
           
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}