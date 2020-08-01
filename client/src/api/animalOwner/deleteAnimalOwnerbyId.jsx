import axios from '../axios.jsx';

function deleteAnimalOwner(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.delete(`/animalOwners/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default deleteAnimalOwner;
