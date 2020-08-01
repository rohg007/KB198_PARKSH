import axios from '../axios.jsx';

function getAllvaccines() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/vaccines');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAllvaccines;
