import axios from '../axios.jsx';

function getAdminLoggedInDetails({ token }) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/auth/admin', {
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

export default getAdminLoggedInDetails;
