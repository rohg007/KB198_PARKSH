import axios from '../axios.jsx';

function updateDisease(Disease) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.put(`/diseases/${Disease._id}`, Disease);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default updateDisease;
