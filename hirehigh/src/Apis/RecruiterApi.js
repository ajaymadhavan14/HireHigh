import axios from '../axios/axios';

export const recruiterSignupApi = async (recruiterData) => {
  try {
    const { data } = await axios.post('/recruiter/signup', recruiterData);
    return data;
  } catch (error) {
    return error;
  }
};
export const isBlocked = async (recruiterId) => {
  try {
    const { data } = await axios.patch(`/recruiter/blocked?recruiterId=${recruiterId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const isActivated = async (recruiterId) => {
  try {
    const { data } = await axios.patch(`/recruiter/actived?recruiterId=${recruiterId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (id) => {
  try {
    const { data } = await axios.get(`/recruiter/get_profile?recruiterId=${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterSideJobList = async (id) => {
  try {
    const { data } = await axios.get(`/recruiter/jobs?recruiterId=${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getCategory = async () => {
  try {
    const { data } = await axios.get('/recruiter/get_cat');
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterJobDele = async (id) => {
  try {
    const data = await axios.patch(`/recruiter/job_dele?recruiterId=${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterJobEdit = async (id) => {
  try {
    const { data } = await axios.get(`/recruiter/job_edit?id=${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
