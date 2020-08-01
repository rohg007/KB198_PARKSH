import axios from '../axios.jsx';

function createAnimalCase(animalCase) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/animalCases', animalCase);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default createAnimalCase;
