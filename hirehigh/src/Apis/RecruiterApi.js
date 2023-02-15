import axios from '../axios/axios';

export const isBlocked = async (recruiterId) => {
  try {
    const { data } = await axios.patch(`/recruiter/blocked?recruiterId=${recruiterId}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const isActivated = async (recruiterId) => {
  try {
    const { data } = await axios.patch(`/recruiter/actived?recruiterId=${recruiterId}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProfile = async (data) => {
  const { all } = await axios.get(`/recruiter/job_post?data=${data}`);
};
