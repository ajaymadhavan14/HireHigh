import axios from '../axios/axios';

// eslint-disable-next-line import/prefer-default-export
export const AdminGetUsers = async () => {
  const {data} = await axios.get('/admin/get_users');
  return data;
};
