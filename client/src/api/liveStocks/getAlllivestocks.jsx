import axios from '../axios.jsx';

function getAlllivestocks() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/livestocks');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAlllivestocks;
