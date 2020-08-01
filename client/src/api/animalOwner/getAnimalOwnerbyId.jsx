import axios from '../axios.jsx';

function getAnimalOwnerId(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/animalOwners/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAnimalOwnerId;
