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

export const RecruiterSideJobAppliedList = async (id, token) => {
  try {
    const { data } = await axios.get(`/recruiter/applied_users?jobId=${id}`, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterComment = async (token, reData) => {
  try {
    const { data } = await axios.post('/recruiter/job_comment', reData, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getUserSortedList = async (token) => {
  try {
    const { data } = await axios.get('/recruiter/get_sorted_user', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const allData = async (token) => {
  try {
    const { data } = await axios.get('/recruiter/allDatas', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getUser = async (userId) => {
  try {
    const { data } = await axios.get(`/recruiter/user/${userId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getCompany = async () => {
  try {
    const { data } = await axios.get('/recruiter/get_company');
    return data;
  } catch (error) {
    return error;
  }
};

export const getCompanyData = async (token) => {
  try {
    const { data } = await axios.get('/recruiter/get_companyData', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AddNotification = async (formData, token) => {
  try {
    const data = await axios.post('/recruiter/add_notification', formData, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getNotification = async (token) => {
  try {
    const { data } = await axios.get('/recruiter/get_notifications', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};
