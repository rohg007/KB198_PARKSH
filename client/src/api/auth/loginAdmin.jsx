import axios from '../axios.jsx';

function loginAdmin({ email, password }) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/auth/admin', {
        email,
        password,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default loginAdmin;
