import axios from '../axios.jsx';

function createAnimal(animal) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/animals', animal);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default createAnimal;
