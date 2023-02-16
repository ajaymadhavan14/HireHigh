import axios from '../axios/axios';

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
