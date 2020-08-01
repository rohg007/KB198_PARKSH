import axios from './axios.jsx';

function login({
  name,
  email,
  password,
  contact,
  incharge,
  web,
  address,
  pincode,
  total_affected,
  total_recovered,
  total_deaths,
}) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post('/signup/add-healthcenter', {
        name,
        email,
        password,
        contact,
        incharge,
        web,
        address,
        pincode,
        total_affected,
        total_recovered,
        total_deaths,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default login;
