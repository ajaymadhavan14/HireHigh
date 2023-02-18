import axios from '../axios/axios';

export const isBlocked = async (userId) => {
  try {
    const { data } = await axios.patch(`/blocked?userId=${userId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const isActivated = async (userId) => {
  try {
    const { data } = await axios.patch(`/actived?userId=${userId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const jobListSeekerSide = async () => {
  try {
    const { data } = await axios.get('/jobs');
    return data;
  } catch (error) {
    return error;
  }
};

export const jobApply = async (id, user) => {
  try {
    const data = await axios.post(`/job_apply?id=${id}`, user);
    return data;
  } catch (error) {
    return error;
  }
};

export const getSingleJobData = async (id) => {
  try {
    const { data } = await axios.get(`/single_view?id=${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
