import axios from '../axios.jsx';

function getoutbreakId(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/outbreaks/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getoutbreakId;
