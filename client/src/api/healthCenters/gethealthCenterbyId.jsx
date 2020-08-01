import axios from '../axios.jsx';

function gethealthCenterId(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/healthCenters/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default gethealthCenterId;
