import axios from '../axios.jsx';

function updatevaccine(vaccine) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.put(`/vaccines/${vaccine._id}`, vaccine);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default updatevaccine;
