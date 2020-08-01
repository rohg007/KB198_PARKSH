import axios from '../axios.jsx';

function getvaccineId(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/vaccines/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getvaccineId;
