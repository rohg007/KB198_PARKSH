import axios from '../axios.jsx';

function deleteDisease(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.delete(`/diseases/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default deleteDisease;
