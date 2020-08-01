const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var livestockSchema = new Schema({
  breed: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
  },
});

var Livestocks = mongoose.model('Livestock', livestockSchema);
module.exports = Livestocks;
