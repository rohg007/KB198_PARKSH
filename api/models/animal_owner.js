const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var animalOwnerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

var AnimalOwners = mongoose.model('AnimalOwner', animalOwnerSchema);
module.exports = AnimalOwners;
