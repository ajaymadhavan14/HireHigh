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
