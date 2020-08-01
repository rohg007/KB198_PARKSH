import axios from '../axios.jsx';

function getAllDisease() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/diseases');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAllDisease;
