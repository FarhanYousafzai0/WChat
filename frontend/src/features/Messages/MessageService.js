import axios from 'axios';

const API_URL = 'http://localhost:1576/api/messages';

export const sendMessage = async (data) => {
  const res = await axios.post(`${API_URL}/post-message`, data);
  return res.data;
};

export const getMessages = async (getMessages) => {
  const res = await axios.get(`${API_URL}/get-message/${getMessages?.sender_id}/${getMessages?.receiver_id}`, );
  return res.data;
};
