const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var animalOwnerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

var livestockSchema = new Schema({
  breed: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
  },
});

var vaccineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  forHuman: {
    type: String,
  },
});

var animalSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  livestock: {
    type: livestockSchema,
  },
  owner: {
    type: animalOwnerSchema,
  },
  nextVaccination: {
    type: Date,
  },
  vaccine: {
    type: vaccineSchema,
  },
});

module.exports = mongoose.model('Animal', animalSchema);
