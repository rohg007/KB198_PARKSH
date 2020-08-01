import axios from '../axios.jsx';

function getDiseaseId(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/diseases/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getDiseaseId;
