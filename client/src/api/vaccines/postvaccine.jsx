import axios from '../axios.jsx';

function createvaccine(vaccine) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/vaccines', vaccine);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default createvaccine;
