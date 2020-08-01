import axios from '../axios.jsx';

function deletehumanCase(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.delete(`/humanCases/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default deletehumanCase;
