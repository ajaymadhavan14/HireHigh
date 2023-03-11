import axios from '../axios/axios';

// eslint-disable-next-line import/prefer-default-export
export const AdminGetUsers = async (token) => {
  try {
    const { data } = await axios.get('/admin/get_users', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminGetRecruiters = async (token) => {
  try {
    const { data } = await axios.get('/admin/get_recruiters', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminSideJobList = async (token) => {
  try {
    const { data } = await axios.get('/admin/jobs', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const seekerBlocked = async (userId, token) => {
  try {
    const { data } = await axios.patch(`/blocked?userId=${userId}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const seekerActivated = async (userId, token) => {
  try {
    const { data } = await axios.patch(`/actived?userId=${userId}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const recruiterBlocked = async (recruiterId, token) => {
  try {
    const { data } = await axios.patch(`/recruiter/blocked?recruiterId=${recruiterId}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const recruiterActivated = async (recruiterId, token) => {
  try {
    const { data } = await axios.patch(`/recruiter/actived?recruiterId=${recruiterId}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const JobBlocked = async (id, token) => {
  try {
    const { data } = await axios.patch(`/admin/job_blocked?jobId=${id}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const JobActivated = async (id, token) => {
  try {
    const { data } = await axios.patch(`/admin/job_actived?jobId=${id}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminSideCategoryShow = async (token) => {
  try {
    const { data } = await axios.get('/admin/job_category', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const CategoryDelete = async (id, token) => {
  try {
    const data = await axios.delete(`/admin/cat_dele?Id=${id}`, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminGetCompanys = async (token) => {
  try {
    const { data } = await axios.get('/admin/companys', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};
