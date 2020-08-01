import axios from '../axios.jsx';

function getAllhumanCases() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/humanCases');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAllhumanCases;
