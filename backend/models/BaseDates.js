'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseDatesSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: [String]
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['monologo', 'concierto', 'charla']
  },
  date: {
    type: Date
  }

});

const BaseDates = mongoose.model('BaseDates', baseDatesSchema);

module.exports = BaseDates;
