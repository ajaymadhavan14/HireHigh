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
import { useLocation, useNavigate } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import swal from 'sweetalert';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { color } from '@mui/system';
import { storage } from '../../../firebase/Config';
import axios from '../../../axios/axios';
import { getCategory } from '../../../apis/RecruiterApi';

const theme = createTheme();
export default function RecruiterJobEdit() {
  const [jobTitle, setJobTitle] = useState(false);
  const [jobTitleError, setJobTitleError] = useState('');
  const [companyName, setCompanyName] = useState(false);
  const [companyNameError, setCompanyNameError] = useState('');
  const [jobCategory, setJobCategory] = useState(false);
  const [jobCategoryError, setJobCategoryError] = useState('');
  const [workPlace, setWorkPlace] = useState(false);
  const [workPlaceError, setWorkPlaceError] = useState('');
  const [jobQualification, setJobQualification] = useState(false);
  const [jobQualificationError, setJobQualificationError] = useState('');
  const [jobDiscription, setJobDiscription] = useState(false);
  const [jobDiscriptionError, setJobDiscriptionError] = useState('');
  const [responsibilities, setResponsibilities] = useState(false);
  const [responsibilitiesError, setResponsibilitiesError] = useState('');
  const [image, setImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [salaryRange, setSalaryRange] = useState(false);
  const [salaryRangeError, setSalaryRangeError] = useState('');
  const [jobType, setJobType] = useState(false);
  const [jobTypeError, setJobTypeError] = useState('');
  const [location, setLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [vaccancy, setVaccancy] = useState(false);
  const [vaccancyError, setVaccancyError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?._id;
  console.log('hello');
  console.log(state, '333333333333333333333333333');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      jobTitle: data.get('jobTitle'),
      companyName: data.get('companyName'),
      workPlace: data.get('workPlace'),
      jobQualification: data.get('jobQualification'),
      jobDiscription: data.get('jobDiscription'),
      responsibilities: data.get('responsibilities'),
      salaryRange: data.get('salaryRange'),
      jobType: data.get('jobType'),
      jobCategory: data.get('jobCategory'),
      image: data.get('image'),
      location: data.get('location'),
      vaccancy: data.get('vaccancy'),

    };
    if (data.companyName && data.jobTitle && data.workPlace && data.jobQualification
      && data.jobDiscription && data.jobCategory && data.location && data.vaccancy
         && data.responsibilities && data.salaryRange && data.jobType) {
      const regName = /^[a-zA-Z ]*$/;
      setTotalRequired('');
      if (regName.test(data.jobTitle)) {
        setJobTitle(false);
        setJobTitleError('');
        if (regName.test(data.companyName)) {
          setCompanyName(false);
          setCompanyNameError('');

          if (data.image.name) {
            const dirs = Date.now();
            const rand = Math.random();
            const { image } = data;
            const imageRef = ref(storage, `/jobPost/${dirs}${rand}_${image?.name}`);
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
            data.image = '';
          }
          console.log(data);
          axios.post(`/recruiter/edit_job?jobid=${id}`, data).then((response) => {
            if (response.data.status === 'success') {
              navigate('/recruiter/jobs');
            } else {
              swal('OOPS', response.data.message, 'error');
            }
          });
        } else {
          setCompanyName(true);
          setCompanyNameError('Please enter valid Name');
        }
      } else {
        setJobTitle(true);
        setJobTitleError('Please enter valid Name');
      }
    } else {
      setTotalRequired('Please enter your Details');
    }
  };
  const [cat, setCat] = useState([]);
  useEffect(() => {
    async function invoke() {
      const res = await getCategory();
      setCat(res);

      console.log(res);
    }
    invoke();
  }, []);

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
                defaultValue={state.jobTitle}
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
                defaultValue={state.companyName}

              />
            </Grid>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="jobCategory"
                  label="Category"
                  error={jobCategory}
                  helperText={jobCategoryError}
                  defaultValue={state.jobCategory}
                >
                  {cat.map((el) => (
                    <MenuItem value={el?._id}>{el?.name}</MenuItem>
                  ))}

                </Select>

              </FormControl>
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
                defaultValue={state.workPlace}

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
              defaultValue={state.jobDiscription}

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
              defaultValue={state.jobQualification}

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
              defaultValue={state.responsibilities}

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
                defaultValue={state.jobType}
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
                defaultValue={state.salaryRange}

              />
            </Grid>

          </Grid>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="vaccancy"
                type="number"
                label="Vaccancy"
                name="vaccancy"
                autoComplete="vaccancy"
                error={vaccancy}
                helperText={vaccancyError}
                defaultValue={state.vaccancy}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="location"
                type="text"
                label="Company Location"
                name="location"
                autoComplete="location"
                error={location}
                helperText={locationError}
                defaultValue={state.location}

              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} sx={{ marginTop: '15px' }}>
              <FormLabel>Post Logo</FormLabel>
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
              { state.image
                ? <img style={{ width: '30vh', height: '20vh' }} src={state.image} alt="loading" />
                : <FormLabel sx={{ marginTop: '50px', color: 'red' }}>No Photo</FormLabel> }
            </Grid>
          </Grid>
          <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px', pl: 2 }}>
            <p style={{ color: 'red' }}>{totalRequired}</p>
          </Box>
          <Grid container spacing={2} py={2} sx={{ justifyContent: 'flex-end' }}>
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