import axios from '../axios.jsx';

function getAnimalId(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/animals/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAnimalId;
