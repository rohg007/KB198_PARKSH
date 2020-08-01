import axios from '../axios.jsx';

function loginCenter({ email, password }) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/auth/health-center', {
        email,
        password,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default loginCenter;
