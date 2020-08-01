import axios from '../axios.jsx';

function deletevaccine(id) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.delete(`/vaccines/${id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default deletevaccine;
