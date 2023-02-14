import axios from '../axios/axios';

export const isBlocked = async (userId) => {
  try {
    const { data } = await axios.patch(`/blocked?userId=${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const isActivated = async (userId) => {
  try {
    const { data } = await axios.patch(`/actived?userId=${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
