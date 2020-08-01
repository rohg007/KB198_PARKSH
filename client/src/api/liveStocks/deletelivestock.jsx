import axios from '../axios.jsx';

function deletelivestock(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.delete(`/livestocks/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default deletelivestock;
