const Joi = require("joi");
const mongoose = require("mongoose");
const { locationSchema } = require("./location");

const Machine = mongoose.model(
  "Machines",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: locationSchema,
      required: true,
    },
    hourofOperating: {
      type: Number,
      required: true,
      min: 0,
      max: 5000,
    },
    PM: {
      type: String,
      required: true,
      min: 0,
      max: 255,
    },

  })
);

function validateMachine(machine) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    hourofOperating: Joi.number().min(0).required(),
    PM: Joi.string().required(),
/*     PIC: Joi.string().required(), */
   /*  location: Joi.string().required(), */
  };

  return Joi.validate(machine, schema);
}

exports.Machine = Machine;
exports.validate = validateMachine;
