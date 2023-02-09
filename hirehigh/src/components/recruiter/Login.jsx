
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BusinessIcon from '@mui/icons-material/Business';
import axios from '../../axios/axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'



const theme = createTheme();

export default function VendorSignIn() {

   const navigate = useNavigate()

  const [ email, setEmail ] = useState(false)
  const [ emailError, setEmailError ] = useState('')
  const [ password, setPassword ] = useState(false)
  const [ passwordError, setPasswordError ] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      email: data.get("email"),
      password: data.get("password")
    }

    axios.post('/recruiter/login',data).then((response)=>{
      console.log(response)
      if(!response.data.auth){
        swal('sorry',response.data.message,'error')
      }else{
        localStorage.setItem("token",response.data.token)
         navigate('/recruiter/home')
      }
    })

   
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "#fff",
              border: "1px solid lightgray",
              p: 2,
              borderRadius: "10px",
            }}
            container
            spacing={2}
          >
            <Grid sx={{display: { xs: 'none', sm: 'flex' }}} item xs={12} sm={6}>
              <Box sx={{ textAlign:'center' }}>
                <img
                  style={{  width: "55vh", height: "55vh", cursor:"pointer" }}
                  src="/HH-L.png"
                  alt="Loading..."
                  onClick={()=>{navigate("/")}}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ mb: 1 , bgcolor: "secondary.main" }}>
                  <BusinessIcon/>
                </Avatar>
              </Box>
              <Typography
                sx={{ textAlign: "center", fontWeight: "900" }}
                component="h1"
                variant="h5"
              >
                Recruiter SIGN IN
              </Typography>
              
                <hr />
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 5 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={email}
                  helperText={emailError}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={password}
                  helperText={passwordError}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 , p: 1.4 , fontWeight:'900' }}
                >
                  Sign In
                </Button>
                <Grid sm={12} container>
                  <Grid sm={5} item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid sm={7} item>
                    <Link onClick={()=>{navigate("/recruiter/signup")}} variant="body2" component="button" >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
