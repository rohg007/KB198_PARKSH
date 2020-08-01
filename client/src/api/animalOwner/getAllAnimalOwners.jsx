import axios from '../axios.jsx';

function getAllAnimalOwners() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/animalOwners');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAllAnimalOwners;
