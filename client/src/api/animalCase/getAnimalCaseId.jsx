import axios from '../axios.jsx';

function getAnimalCaseId(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/animalCases/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAnimalCaseId;
