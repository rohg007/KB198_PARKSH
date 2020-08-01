import axios from '../axios.jsx';

function deletehealthCenter(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.delete(`/healthCenters/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default deletehealthCenter;
