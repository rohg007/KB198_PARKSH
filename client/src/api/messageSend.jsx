import axios from './axios.jsx';

function messageSend(message) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/api/messages', message);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default messageSend;
