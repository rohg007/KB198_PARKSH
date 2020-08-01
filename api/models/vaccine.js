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

module.exports = mongoose.model('Vaccine', vaccineSchema);
