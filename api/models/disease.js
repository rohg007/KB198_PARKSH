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

module.exports = mongoose.model('Disease', diseaseSchema);
