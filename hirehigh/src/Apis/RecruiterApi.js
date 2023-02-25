import axios from '../axios/axios';

export const recruiterSignupApi = async (recruiterData) => {
  try {
    const { data } = await axios.post('/recruiter/signup', recruiterData);
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (token) => {
  try {
    const { data } = await axios.get('/recruiter/get_profile', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterSideJobList = async (token) => {
  try {
    const { data } = await axios.get('/recruiter/jobs', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getCategory = async (token) => {
  try {
    const { data } = await axios.get('/recruiter/get_cat', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterJobDele = async (id, token) => {
  try {
    const data = await axios.patch(`/recruiter/job_dele?id=${id}`, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterJobEdit = async (id, token) => {
  try {
    const { data } = await axios.get(`/recruiter/job_edit?id=${id}`, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfileData = async (token) => {
  try {
    const { data } = await axios.get('/recruiter/get_profile_data', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};
