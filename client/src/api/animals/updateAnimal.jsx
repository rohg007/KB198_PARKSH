import axios from '../axios.jsx';

function updateAnimal(animal) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.put(`/animals/${animal._id}`, animal);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default updateAnimal;
