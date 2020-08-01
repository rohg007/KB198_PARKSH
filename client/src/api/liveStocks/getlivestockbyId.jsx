import axios from '../axios.jsx';

function getlivestockId(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/livestocks/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getlivestockId;
