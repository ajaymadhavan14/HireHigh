import axios from '../axios/axios';

export const seekerSignupApi = async (userData) => {
  try {
    const { data } = await axios.post('/signup', userData);
    return data;
  } catch (error) {
    return error;
  }
};

export const jobListSeekerSide = async (token) => {
  try {
    const { data } = await axios.get('/jobs', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const jobApply = async (id, user, token) => {
  try {
    const data = await axios.post(`/job_apply?id=${id}`, user, { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getSingleJobData = async (id, token) => {
  try {
    const { data } = await axios.get(`/single_view?id=${id}`, { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (token) => {
  try {
    const { data } = await axios.get('/get_data', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const searchProfileData = async (token) => {
  try {
    const { data } = await axios.get('/profile_search', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfileData = async (token) => {
  try {
    const { data } = await axios.get('/get_profiledata', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const applyedJobsSeeker = async (token) => {
  try {
    const { data } = await axios.get('/applied_jobs', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getSerachJob = async (job, token) => {
  try {
    const { data } = await axios.get(`/search_job?value=${job}`, { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getFilterJob = async (getData, token) => {
  try {
    const { data } = await axios.post('/get_jobfilter', getData, { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const createChat = (data) => axios.post('/chat/', data);

export const userChats = (id) => axios.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => axios.get(`/chat/find/${firstId}/${secondId}`);

export const getMessages = (id) => axios.get(`/message/${id}`);

export const addMessage = (data) => axios.post('/message/', data);

export const getUser = (userId) => axios.get(`/user/${userId}`);
