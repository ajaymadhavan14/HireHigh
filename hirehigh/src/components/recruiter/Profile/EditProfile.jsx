/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
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
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import swal from 'sweetalert';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, storage } from '../../../firebase/Config';
import AuthContext from '../../../context/AppContext';
import axios from '../../../axios/axios';
import { getProfileData } from '../../../apis/RecruiterApi';

const theme = createTheme();
export default function RecruiterPrfileData(props) {
  const [userName, setUserName] = useState(false);
  const [userNameError, setUserNameError] = useState('');
  const [companyName, setCompanyName] = useState(false);
  const [companyNameError, setCompanyNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [tagLine, setTagline] = useState(false);
  const [tagLineError, setTaglineError] = useState('');
  const [discription, setDiscription] = useState(false);
  const [discriptionError, setDiscriptionError] = useState('');
  const [website, setWebsite] = useState(false);
  const [websiteError, setWebsiteError] = useState('');
  const [image, setImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confPassword, setConfPassword] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();
  const [datas, setDatas] = useState({});
  const recruiter = props?.data;
  //   console.log(recruiter, '111111111111111111');

  useEffect(() => {
    async function invoke() {
      await getProfileData(recruiter._id).then((response) => {
        console.log(response, '2222222222222222222222');
        setDatas(response);
      });
    }
    invoke();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      companyName: data.get('companyName'),
      email: data.get('email'),
      userName: data.get('userName'),
      tagLine: data.get('tagLine'),
      website: data.get('website'),
      discription: data.get('discription'),
      phoneNumber: data.get('phoneNumber'),
      image: data.get('image'),

    };
    if (data.companyName && data.email && data.userName
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

                if (data.image.name) {
                  const dirs = Date.now();
                  const rand = Math.random();
                  const image = data.image;
                  const imageRef = ref(storage, `/seekerImages/${dirs}${rand}_${image?.name}`);
                  const toBase64 = (image) =>
                    new Promise((resolve, reject) => {
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
                axios.post(`/recruiter/profile_edit_post?recruiterId=${datas._id}`, data).then((response) => {
                  if (response.data.status === 'success') {
                    navigate('/recruiter/profile');
                  } else {
                    swal('OOPS', response.data.message, 'error');
                  }
                });
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
      <Typography sx={{
        marginLeft: '6%',
        color: '#6096B4',
        cursor: 'pointer',
        width: 'fit-content',
      }}
      >
        <h2 onClick={() => navigate('/')}>HIREHIGH</h2>
      </Typography>
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
              Sign up
            </Typography>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="userName"
                type="text"
                id="userName"
                label="User Name"
                error={userName}
                helperText={userNameError}
                defaultValue={datas.userName}
                multiline
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
                defaultValue={datas.companyName}
                multiline
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
                defaultValue={datas.phoneNumber}
                multiline
              />
            </Grid>
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
          </Grid>
          <Grid item xs={12} py={2}>
            <TextField
              required
              fullWidth
              id="tagLine"
              type="text"
              label="Tag Line"
              name="tagLine"
              autoComplete="tagLine"
              error={tagLine}
              helperText={tagLineError}
              defaultValue={datas.tagLine}
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
              label="Discription"
              placeholder="Discription"
              name="discription"
              autoComplete="discription"
              error={discription}
              helperText={discriptionError}
              defaultValue={datas.discription}
              multiline

            />
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="website"
                label="website"
                name="website"
                autoComplete="website"
                error={website}
                helperText={websiteError}
                defaultValue={datas.website}
                multiline
              />

            </Grid>
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <img src={datas.image} alt="...loading" style={{ height: '30vh', width: '45vh' }} />
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
