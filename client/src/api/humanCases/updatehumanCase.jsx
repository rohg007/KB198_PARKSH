import axios from '../axios.jsx';

function updatehumanCase(humanCase) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.put(`/humanCases/${humanCase._id}`, humanCase);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default updatehumanCase;
