import axios from '../axios.jsx';

function createDisease(Disease) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/diseases', Disease);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default createDisease;
