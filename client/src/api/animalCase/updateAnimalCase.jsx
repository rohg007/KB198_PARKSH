import axios from '../axios.jsx';

function updateAnimalCase(animalCase) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.put(`/animalCases/${animalCase._id}`, animalCase);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default updateAnimalCase;
