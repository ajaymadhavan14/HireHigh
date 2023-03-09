/* eslint-disable import/prefer-default-export */
import axios from '../axios/axios';

export const comapnySignupApi = async (companyData) => {
  try {
    const { data } = await axios.post('/company/signup', companyData);
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (token) => {
  try {
    const { data } = await axios.get('/company/get_profile', { headers: { 'company-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};
