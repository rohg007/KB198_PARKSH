import axios from '../axios.jsx';

function createAnimalOwner(animalOwner) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/animalOwners', animalOwner);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default createAnimalOwner;
