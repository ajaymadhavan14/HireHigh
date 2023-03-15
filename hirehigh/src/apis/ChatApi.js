import axios from '../axios/axios';

export const createChat = async (datas) => {
  try {
    const { data } = await axios.post('/chat/', datas);
    return data;
  } catch (error) {
    return error;
  }
};

export const userChats = async (id) => {
  try {
    const data = axios.get(`/chat/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const findChat = async (firstId, secondId) => {
  try {
    const data = axios.get(`/chat/find/${firstId}/${secondId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getMessages = async (id) => {
  try {
    const data = axios.get(`/message/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const addMessage = async (data) => {
  try {
    const datas = await axios.post('/message/', data);
    return datas;
  } catch (error) {
    return error;
  }
};
