const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
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
    required: true,
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
    required: true,
  },
  total_deaths: {
    type: Number,
    required: true,
  },
  livestock: [livestockSchema],
  vaccine: [vaccineSchema],
});

var healthCenterSchema = new Schema({
  address: {
    type: String,
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

var outbreakSchema = new Schema({
  disease: {
    type: diseaseSchema,
  },
  healthCenter: {
    type: healthCenterSchema,
  },
  radius: {
    type: String,
    unique: true,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  deaths: {
    type: Number,
  },
  affected: {
    type: Number,
  },
});
outbreakSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Outbreak', outbreakSchema);
