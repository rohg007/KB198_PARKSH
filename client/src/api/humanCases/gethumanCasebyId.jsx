import axios from '../axios.jsx';

function gethumanCaseId(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/humanCases/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default gethumanCaseId;
