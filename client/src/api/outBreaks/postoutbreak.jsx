import axios from '../axios.jsx';

function createoutbreak(outbreak) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/outbreaks', outbreak);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default createoutbreak;
