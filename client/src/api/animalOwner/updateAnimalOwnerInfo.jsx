import axios from '../axios.jsx';

function updateAnimalOwner(animalOwner) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.put(
        `/animalOwners/${animalOwner._id}`,
        animalOwner
      );
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default updateAnimalOwner;
