import axios from '../axios.jsx';

function deleteAnimalCase(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.delete(`/animalCases/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default deleteAnimalCase;
