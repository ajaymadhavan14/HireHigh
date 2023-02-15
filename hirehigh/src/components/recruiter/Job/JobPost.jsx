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
import FormLabel from '@mui/material/FormLabel';
import swal from 'sweetalert';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/Config';
import axios from '../../../axios/axios';

const theme = createTheme();
export default function RecruiterJobPost({id}) {
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
  const [totalRequired, setTotalRequired] = useState('');
  const navigate = useNavigate();

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

    };
    if (data.companyName && data.jobTitle && data.workPlace && data.jobQualification
      && data.jobDiscription && data.jobCategory
         && data.responsibilities && data.salaryRange && data.jobType) {
      const regName = /^[a-zA-Z]+$/;
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
                const image = data.image;
                const imageRef = ref(storage, `/jobPost/${dirs}${rand}_${image?.name}`);
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
                data.image = '';
              }
              console.log(data);
              axios.post(`/recruiter/add_job?id=${id}`, data).then((response) => {
                if (response.data.status === 'success') {
                  navigate('/recruiter/home');
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
                id="jobCategory"
                type="text"
                label="Job Category"
                name="jobCategory"
                autoComplete="jobCategory"
                error={jobCategory}
                helperText={jobCategoryError}
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
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
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
