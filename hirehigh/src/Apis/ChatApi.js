import axios from '../axios/axios';

export const createChat = async (datas) => {
  try {
    const { data } = await axios.post('/chat/', datas);
    return data;
  } catch (error) {
    return error;
  }
};

export const userChats = (id) => axios.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => axios.get(`/chat/find/${firstId}/${secondId}`);

export const getMessages = (id) => axios.get(`/message/${id}`);

export const addMessage = (data) => axios.post('/message/', data);
