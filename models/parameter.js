const Joi = require('joi');
const mongoose = require('mongoose');
const { locationSchema } = require("./location");
const parameterSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  RPM: {
    type: Number,
    required: true,
  },
  leveltank:{
    type: Number,
    required: true,
  },
  genre:{
    type:locationSchema,
    required:true,
    min:0,
    max:255,
  },
  machineID:{
    type:String,
    required:true,
    min:0,
    max:255,
  },
  valveA:{
    type:String,
    required:true,

  },
  valveB:{
    type:String,
    required:true,

  },
  statusofMachine:{
    type:String,
    required:true,
    min:0,
    max:255,
  },
  datetime:{
    type:String,
    required:true,
  }

});

const Parameter = mongoose.model('Parameter', parameterSchema);

function validateParameter(parameter) {
  const schema = {
    temperature: Joi.number().required(),
    RPM: Joi.number().required(),
    leveltank: Joi.number().required(),
    genreId: Joi.string().required(), 
    machineID:Joi.objectId().required(),
    valveA: Joi.string().required(),
    valveB: Joi.string().required(),
    statusofMachine: Joi.string().required(),
    datetime: Joi.string().required(),
  };

  return Joi.validate(parameter, schema);
}

exports.parameterSchema = parameterSchema;
exports.Parameter = Parameter; 
exports.validate = validateParameter;