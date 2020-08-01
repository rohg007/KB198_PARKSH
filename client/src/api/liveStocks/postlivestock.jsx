import axios from '../axios.jsx';

function createlivestock(livestock) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/livestocks', livestock);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default createlivestock;
