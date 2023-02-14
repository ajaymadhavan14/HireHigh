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
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const theme = createTheme();
export default function RecruiterJobPost() {
  const [jobTitle, setJobTitle] = useState(false);
  const [jobTitleError, setJobTitleError] = useState('');
  const [companyName, setCompanyName] = useState(false);
  const [companyNameError, setCompanyNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [workPlace, setWorkPlace] = useState(false);
  const [workPlaceError, setWorkPlaceError] = useState('');
  const [jobQualification, setJobQualification] = useState(false);
  const [jobQualificationError, setJobQualificationError] = useState('');
  const [jobDiscription, setJobDiscription] = useState(false);
  const [jobDiscriptionError, setJobDiscriptionError] = useState('');
  const [responsibilities, setResponsibilities] = useState(false);
  const [responsibilitiesError, setResponsibilitiesError] = useState('');
  const [logo, setLogo] = useState(false);
  const [logoError, setLogoError] = useState('');
  const [salaryRange, setSalaryRange] = useState(false);
  const [salaryRangeError, setSalaryRangeError] = useState('');
  const [jobType,setJobType] = useState(false);
  const [jobTypeError,setJobTypeError] = useState('')
  const [totalRequired, setTotalRequired] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      companyName: data.get('companyName'),
      email: data.get('email'),
      password: data.get('password'),
      confPassword: data.get('confPassword'),
      userName: data.get('userName'),
      tagLine: data.get('tagLine'),
      website: data.get('website'),
      discription: data.get('discription'),
      phoneNumber: data.get('phoneNumber'),

    };
    if (data.companyName && data.email && data.password && data.confPassword && data.userName
         && data.phoneNumber && data.tagLine && data.website && data.discription) {
      const regName = /^[a-zA-Z]+$/;
      const regEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      const regPhone = /^[0-9]+$/;
      setTotalRequired('');
      if (regName.test(data.userName)) {
        setUserName(false);
        setUserNameError('');
        if (regName.test(data.companyName)) {
          setCompanyName(false);
          setCompanyNameError('');
          if (regEmail.test(data.email)) {
            setEmail(false);
            setEmailError('');
            if (regPhone.test(data.phoneNumber)) {
              setPhoneNumber(false);
              setPhoneNumberError('');
              if (data.phoneNumber.length === 10) {
                setPhoneNumber(false);
                setPhoneNumberError('');
                if (data.password.length >= 6) {
                  setPassword(false);
                  setPasswordError('');
                  if (data.password === data.confPassword) {
                    setPassword(false);
                    setConfPassword(false);
                    setPasswordError('');
                    setConfPasswordError('');
                    axios.post('/recruiter/signup', data).then((response) => {
                      if (response.data.status === 'success') {
                        navigate('/recruiter/login');
                      } else {
                        swal('OOPS', response.data.message, 'error');
                      }
                    });
                  } else {
                    setPassword(true);
                    setConfPassword(true);
                    setPasswordError('Password is not match');
                    setConfPasswordError('Password is not match');
                  }
                } else {
                  setPassword(true);
                  setPasswordError('Minimum 6 character');
                }
              } else {
                setPhoneNumber(true);
                setPhoneNumberError('Please enter 10 digit');
              }
            } else {
              setPhoneNumber(true);
              setPhoneNumberError('Please Enter valid Phone no');
            }
          } else {
            setEmail(true);
            setEmailError('Please enter valid Email');
          }
        } else {
          setCompanyName(true);
          setCompanyNameError('Please enter valid Name');
        }
      } else {
        setCompanyName(true);
        setCompanyNameError('Please enter valid Name');
      }
    } else {
      setTotalRequired('Please enter your Details');
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Post a Job
            </Typography>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="jobTitle"
                type="text"
                required
                fullWidth
                id="jobTitle"
                label="Job Title"
                error={jobTitle}
                helperText={jobTitleError}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="companyName"
                type="text"
                required
                fullWidth
                id="companyName"
                label="Company Name"
                error={companyName}
                helperText={companyNameError}
                autoFocus
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                type="number"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                error={phoneNumber}
                helperText={phoneNumberError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="workPlace"
                label="WorkPlace Type"
                name="workPlace"
                autoComplete="workPlace"
                error={workPlace}
                helperText={workPlaceError}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} py={2} maxWidth="md">

            <TextareaAutosize
              style={{ resize: 'vertical', width: '100%' }}
              minRows={4}
              required
              fullWidth
              id="jobDiscription"
              type="text"
              label="Job Discription"
              placeholder="Job Discription"
              name="jobDiscription"
              autoComplete="jobDiscription"
              error={jobDiscription}
              helperText={jobDiscriptionError}
            />
          </Grid>
          <Grid item xs={12} py={2} maxWidth="md">

            <TextareaAutosize
              style={{ resize: 'vertical', width: '100%' }}
              minRows={4}
              required
              fullWidth
              id="jobQualification"
              type="text"
              label="Job Qualification"
              placeholder="Job Qualification"
              name="jobQualification"
              autoComplete="jobQualification"
              error={jobQualification}
              helperText={jobQualificationError}
            />
          </Grid>
          <Grid item xs={12} py={2} maxWidth="md">

            <TextareaAutosize
              style={{ resize: 'vertical', width: '100%' }}
              minRows={4}
              required
              fullWidth
              id="responsibilities"
              type="text"
              label="Responsibilities"
              placeholder="Responsibilities"
              name="responsibilities"
              autoComplete="responsibilities"
              error={responsibilities}
              helperText={responsibilitiesError}
            />
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="jobType"
                label="Job Type"
                name="jobType"
                autoComplete="jobType"
                error={jobType}
                helperText={jobTypeError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="salaryRange"
                label="Salary Range"
                type="salaryRange"
                id="salaryRange"
                autoComplete="salaryRange"
                error={salaryRange}
                helperText={salaryRangeError}
              />
            </Grid>
           
          </Grid>
          <Grid container spacing={2} >

          <Grid item xs={12} sm={6}>
           <label>Post Logo</label>
              <TextField
                required
                fullWidth
                id="logo"
                type="file"
                placeholder="Company Logo"
                name="logo"
                autoComplete="logo"
                error={logo}
                helperText={logoError}
              />
            </Grid>

            
            <Grid item xs={12} sm={6} />
          </Grid>
          <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px', pl: 2 }}>
            <p style={{ color: 'red' }}>{totalRequired}</p>
          </Box>
          <Grid container spacing={2} py={2} sx={{ justifyContent: 'flex-end' }}>
            {/* <Grid>
              <Link onClick={() => { navigate('/recruiter/login'); }} component="button">
                Already have an account? Sign in
              </Link>
            </Grid> */}
            <Grid pl={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  fontWeight: '900',
                }}
              >
                POST
              </Button>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  );
}
