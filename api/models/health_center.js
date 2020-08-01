const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var healthCenterSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
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

var HealthCenters = mongoose.model('HealthCenter', healthCenterSchema);
module.exports = HealthCenters;
