const Joi = require('joi');
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Location = mongoose.model('Location', locationSchema);

function validateLocation(location) {
  const schema = {
    location: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(location, schema);
}

exports.locationSchema = locationSchema;
exports.Location = Location; 
exports.validate = validateLocation;