import axios from '../axios.jsx';

function getAllAnimals() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/animals');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAllAnimals;
