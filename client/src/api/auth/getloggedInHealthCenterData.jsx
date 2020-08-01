import axios from '../axios.jsx';

function getCenterLoggedInDetails({ token }) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/auth/health-center', {
        headers: {
          'x-auth-token': token,
        },
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getCenterLoggedInDetails;
