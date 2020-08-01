import axios from '../axios.jsx';

function updatelivestock(livestock) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.put(`/livestocks/${livestock._id}`, livestock);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default updatelivestock;
