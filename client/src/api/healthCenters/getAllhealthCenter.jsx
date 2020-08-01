import axios from '../axios.jsx';

function getAllhealthCenter() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/healthCenters');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAllhealthCenter;
