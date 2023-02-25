/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import swal from 'sweetalert';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/Config';
import axios from '../../../axios/axios';
import { getProfileData } from '../../../apis/SeekerApi';

const theme = createTheme();
export default function SeekerEditprofile(props) {
  const [firstName, setFirstName] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState(false);
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [headline, setHeadline] = useState(false);
  const [headlineError, setHeadlineError] = useState('');
  const [position, setPosition] = useState(false);
  const [positionError, setPositionError] = useState('');
  const [age, setAge] = useState(false);
  const [ageError, setAgeError] = useState('');
  const [qualification, setQualification] = useState(false);
  const [qualificationError, setQualificationError] = useState('');
  const [discription, setDiscription] = useState(false);
  const [discriptionError, setDiscriptionError] = useState('');
  const [image, setImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [salaryRange, setSalaryRange] = useState(false);
  const [salaryRangeError, setSalaryRangeError] = useState('');
  const [location, setLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [experiance, setExperiance] = useState(false);
  const [experianceError, setExperianceError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');

  const navigate = useNavigate();
  const userData = props?.user;
  const [datas, setDatas] = useState({});
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    async function invoke() {
      await getProfileData(token).then((response) => {
        setDatas(response);
      });
    }
    invoke();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phoneNumber: data.get('phoneNumber'),
      headline: data.get('headline'),
      position: data.get('position'),
      location: data.get('location'),
      qualification: data.get('qualification'),
      discription: data.get('discription'),
      salaryRange: data.get('salaryRange'),
      age: data.get('age'),
      image: data.get('image'),
      experiance: data.get('experiance'),
    };
    if (data.position && data.headline && data.qualification && data.experiance && data.firstName
      && data.discription && data.age && data.location && data.lastName && data.email
      && data.phoneNumber && data.salaryRange) {
      const regName = /^[a-zA-Z ]*$/;
      const regEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      const regPhone = /^[0-9]+$/;
      setTotalRequired('');
      if (regName.test(data.firstName)) {
        setFirstName(false);
        setFirstNameError('');
        if (regName.test(data.lastName)) {
          setLastName(false);
          setLastNameError('');
          if (regEmail.test(data.email)) {
            setEmail(false);
            setEmailError('');
            if (regPhone.test(data.phoneNumber)) {
              setPhoneNumber(false);
              setPhoneNumberError('');
              if (data.phoneNumber.length === 10) {
                setPhoneNumber(false);
                setPhoneNumberError('');
                if (regName.test(data.headline)) {
                  setHeadline(false);
                  setHeadlineError('');
                  if (regName.test(data.position)) {
                    setPosition(false);
                    setPositionError('');

                    if (data.image.name) {
                      const dirs = Date.now();
                      const rand = Math.random();
                      const { image } = data;
                      const imageRef = ref(storage, `/seekerImages/${dirs}${rand}_${image?.name}`);
                      const toBase64 = (image) => new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(image);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = (error) => reject(error);
                      }).catch((err) => {
                        console.log(err);
                      });
                      const imgBase = await toBase64(image);
                      await uploadString(imageRef, imgBase, 'data_url').then(async () => {
                        const downloadURL = await getDownloadURL(imageRef);
                        data.image = downloadURL;
                      });
                    } else {
                      data.image = datas.image;
                    }
                    axios.post('/edit_profile_post', data, { headers: { 'user-access-token': token } }).then((response) => {
                      if (response.data.status === 'success') {
                        navigate('/profile');
                      } else {
                        swal('OOPS', response.data.message, 'error');
                      }
                    });
                  } else {
                    setPosition(true);
                    setPositionError('Please enter valid Name');
                  }
                } else {
                  setHeadline(true);
                  setHeadlineError('Please enter valid Name');
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
          setLastName(true);
          setLastNameError('Please enter valid Name');
        }
      } else {
        setFirstName(true);
        setFirstNameError('Please enter valid Name');
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
              Add Profile Details
            </Typography>
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={firstName}
                helperText={firstNameError}
                defaultValue={datas.firstName}
                multiline
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
                error={lastName}
                helperText={lastNameError}
                defaultValue={datas.lastName}
                multiline
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={email}
                helperText={emailError}
                defaultValue={datas.email}
                multiline
              />
            </Grid>
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
                defaultValue={datas.phoneNumber}
                multiline
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="headline"
                type="text"
                id="headline"
                label="Headline"
                placeholder="a"
                error={headline}
                helperText={headlineError}
                defaultValue={datas.headline}
                autoFocus
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="position"
                type="text"
                id="position"
                label="Position"
                error={position}
                helperText={positionError}
                defaultValue={datas.position}
                autoFocus
                multiline
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="salaryRange"
                type="text"
                id="salaryRange"
                label="Expected Salary"
                error={salaryRange}
                helperText={salaryRangeError}
                defaultValue={datas.salaryRange}
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                autoComplete="location"
                error={location}
                helperText={locationError}
                defaultValue={datas.location}
                multiline
              />
            </Grid>
          </Grid>

          <Grid item xs={12} py={2}>
            <TextField
              required
              fullWidth
              id="qualification"
              type="text"
              label="Qualification"
              name="qualification"
              autoComplete="qualification"
              error={qualification}
              helperText={qualificationError}
              defaultValue={datas?.qualification}
              multiline
              autoFocus
            />
          </Grid>
          <Grid item xs={12} py={2}>
            <TextField
              required
              fullWidth
              id="experiance"
              type="text"
              label="Experiance"
              name="experiance"
              autoComplete="experiance"
              error={experiance}
              helperText={experianceError}
              defaultValue={datas.experiance}
              multiline
            />
          </Grid>
          <Grid item xs={12} py={2} maxWidth="md">

            <TextareaAutosize
              style={{ resize: 'vertical', width: '100%' }}
              minRows={4}
              required
              fullWidth
              id="discription"
              type="text"
              label=" Discription"
              placeholder=" Discription"
              name="discription"
              autoComplete="discription"
              error={discription}
              helperText={discriptionError}
              defaultValue={datas.discription}
              multiline
              autoFocus
            />
          </Grid>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <FormLabel>Profile Photo</FormLabel>
              <TextField
                required
                fullWidth
                id="image"
                type="file"
                placeholder="Company Image"
                name="image"
                autoComplete="image"
                error={image}
                helperText={imageError}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: 'auto' }}>
              <TextField
                required
                fullWidth
                type="number"
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                error={age}
                helperText={ageError}
                defaultValue={datas?.age}
                autoFocus
                multiline
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
              <img src={datas.image} alt="...loading" style={{ width: '30vh', height: '25vh' }} />
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
                SUBMIT
              </Button>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  );
}
