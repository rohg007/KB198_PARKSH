import axios from '../axios.jsx';

function updateoutbreak(outbreak) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.put(`/outbreaks/${outbreak._id}`, outbreak);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default updateoutbreak;
