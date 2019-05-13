const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 40
  }
})

module.exports = People = mongoose.model('people', PeopleSchema)
