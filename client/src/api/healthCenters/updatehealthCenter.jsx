import axios from '../axios.jsx';

function updatehealthCenter(healthCenter) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.put(
        `/healthCenters/${healthCenter._id}`,
        healthCenter
      );
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default updatehealthCenter;
