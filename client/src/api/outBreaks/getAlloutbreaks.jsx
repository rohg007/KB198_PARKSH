import axios from '../axios.jsx';

function getAlloutbreaks() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/outbreaks');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAlloutbreaks;
