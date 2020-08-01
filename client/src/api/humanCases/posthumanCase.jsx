import axios from '../axios.jsx';

function createhumanCase(humanCase) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/humanCases', humanCase);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default createhumanCase;
