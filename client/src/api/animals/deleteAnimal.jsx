import axios from '../axios.jsx';

function deleteAnimal(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.delete(`/animals/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default deleteAnimal;
