import axios from '../axios/axios';

// eslint-disable-next-line import/prefer-default-export
export const AdminGetUsers = async () => {
  try {
    const { data } = await axios.get('/admin/get_users');
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminGetRecruiters = async () => {
  try {
    const { data } = await axios.get('/admin/get_recruiters');
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminSideJobList = async () => {
  try {
    const { data } = await axios.get('/admin/jobs');
    return data;
  } catch (error) {
    return error;
  }
};

export const JobBlocked = async (Id) => {
  try {
    const { data } = await axios.patch(`/admin/job_blocked?Id=${Id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const JobActivated = async (Id) => {
  try {
    const { data } = await axios.patch(`/admin/job_actived?Id=${Id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminSideCategoryShow = async () => {
  try {
    const { data } = await axios.get('/admin/job_category');
    return data;
  } catch (error) {
    return error;
  }
};

export const CategoryDelete = async (Id) => {
  try {
    const data = await axios.patch(`admin/cat_dele?Id=${Id}`);
    return data;
  } catch (error) {
    return error;
  }
};
