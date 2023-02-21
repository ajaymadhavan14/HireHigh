/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import FormLabel from '@mui/material/FormLabel';
import 'react-toastify/dist/ReactToastify.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import AuthContext from '../../../context/AppContext';
import { auth } from '../../../firebase/Config';

const theme = createTheme();

export default function SeekerOTP() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [captchaDiv, setCaptchaDiv] = useState(false);
  const { seekerDetails, setSeekerDetails } = useContext(AuthContext);
  const { seekerOtpConf, setSeekerOtpConf } = useContext(AuthContext);

  //   useEffect(() => {
  //     if (Object.keys(seekerDetails) === 0) {
  //     }
  //   }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    setCaptchaDiv(false);
    setUpRecaptcha(`+91${seekerDetails.phoneNo}`).then((res) => {
      setSeekerOtpConf(res);
      setMinutes(1);
      setSeconds(30);
      setCaptchaDiv(true);
    });
  };
  const [otp, setOtp] = useState(false);
  const [otpErr, setOtpErr] = useState('');

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     let data = new FormData(event.currentTarget);
  //     data = {
  //       otp: data.get('otp'),
  //     };

  //     if (data.otp === '' || data.otp === null) {
  //       setOtp(true);
  //       setOtpErr('Please Enter The Otp number');
  //     } else {
  //       try {
  //         await seekerOtpConf.confirm(data.otp);
  //         const response = await seekerSignupApi(seekerDetails);
  //         if (response.status === 'success') {
  //           toast.success('Registered', {
  //             position: 'top-right',
  //             autoClose: 2000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: 'colored',
  //           });
  //           setTimeout(() => {
  //             localStorage.setItem('Seekertoken', response.token);
  //           }, 2000);
  //         } else {
  //           toast.error('This email is already registered!', {
  //             position: 'top-right',
  //             autoClose: 4000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: 'colored',
  //           });
  //         }
  //       } catch (error) {
  //         if (error.message == 'Firebase: Error (auth/code-expired).') {
  //           setOtp(true);
  //           setOtpErr('Otp Expired');
  //         } else {
  //           setOtp(true);
  //           setOtpErr('Please Enter correct Otp number');
  //         }
  //       }
  //     }
  //   };

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-Seeker-container',
      {},
      auth,
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 11,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid
            sx={{
              backgroundColor: '#fff',
              border: '1px solid lightgray',
              p: 2,
              borderRadius: '10px',
            }}
            container
            spacing={2}
          >
            <Grid
              item
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              xs={12}
              sm={6}
            >
              <Box>
                <img
                  style={{ width: '55vh', height: '60vh' }}
                  src="/HH-L.png"
                  alt="Loading..."
                />
              </Box>
            </Grid>
            <Grid sx={{ marginTop: '100px' }} item xs={12} sm={6}>
              <Box
                component="form"
                noValidate
                // onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <FormLabel>Please Enter Your OTP</FormLabel>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="otp"
                      label="OTP"
                      name="otp"
                      error={otp}
                      helperText={otpErr}
                      autoComplete="family-name"
                      autoFocus
                    />
                  </Grid>
                </Grid>
                {captchaDiv ? ''
                  : (
                    <Grid item xs={12} sx={{ px: 2 }}>
                      <div style={{ marginTop: '5px' }} id="recaptcha-Seeker-container" />
                    </Grid>
                  )}
                <div className="countdown-text" style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                  {seconds > 0 || minutes > 0 ? (
                    <p style={{ fontSize: '12px' }}>
                      Time Remaining:
                      {' '}
                      {minutes < 10 ? `0${minutes}` : minutes}
                      :
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : ''}

                  <Button
                    disabled={seconds > 0 || minutes > 0}
                    style={{
                      color: seconds > 0 || minutes > 0 ? '#fff' : 'rgb(215 62 28)',
                      backgroundColor: '#fff',
                      border: 0,
                      fontWeight: 'bold',
                      ':hover': { backgroundColor: 'blue' },
                    }}
                    onClick={resendOTP}
                    variant="contained"
                  >
                    Resend OTP
                  </Button>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    p: 1.4,
                    fontWeight: '900',
                    marginTop: '90px',
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
