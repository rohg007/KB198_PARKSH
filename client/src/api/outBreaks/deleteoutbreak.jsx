import axios from '../axios.jsx';

function deleteoutbreak(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.delete(`/outbreaks/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default deleteoutbreak;
