const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

var livestockSchema = new Schema({
  breed: {
    type: String,
  },
  population: {
    type: Number,
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
  livestock: [livestockSchema],
  vaccine: [vaccineSchema],
});

var healthCenterSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
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

var humanCaseSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientAddress: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  patientContact: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  disease: {
    type: diseaseSchema,
  },
  healthCenter: {
    type: healthCenterSchema,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model('HumanCase', humanCaseSchema);
