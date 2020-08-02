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
  pincode: {
    type: String,
    required: true,
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
    default: Date.now(),
  },
  vaccine: {
    type: vaccineSchema,
  },
});

var diseaseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
  },
  precautions: {
    type: String,
  },
  symptoms: {
    type: String,
    required: true,
  },
  morbidity: {
    type: Number,
  },
  mortality: {
    type: Number,
  },
  total_affected: {
    type: Number,
  },
  total_deaths: {
    type: Number,
  },
  total_recovered: {
    type: Number,
  },
  diagnosis: {
    type: [String],
  },
  livestock: [livestockSchema],
  vaccine: [vaccineSchema],
});

var healthCenterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  address: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  incharge: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  web: {
    type: String,
  },

  total_affected: {
    type: Number,
    required: true,
  },
  total_deaths: {
    type: Number,
    required: true,
  },
  total_recovered: {
    type: Number,
    required: true,
  },
});

var animalCaseSchema = new Schema({
  animal: {
    type: animalSchema,
  },
  healthCenter: {
    type: healthCenterSchema,
  },
  disease: {
    type: diseaseSchema,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model('AnimalCase', animalCaseSchema);
