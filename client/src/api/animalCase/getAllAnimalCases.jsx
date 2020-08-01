import axios from '../axios.jsx';

function getAllAnimalCases() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/animalCases');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAllAnimalCases;
