const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Location } = require("../models/location");
const {Machine} = require("../models/machine")
const { Parameter, validate } = require("../models/parameter");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  const parameters = await Parameter.find().select("-__v").sort("name");

  res.send(parameters);
  
});
router.post("/",[auth],async(req,res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const location = await Location.findById(req.body.genreId);

  const machine = await Machine.findById(req.body.machineID);
  
  if(!location) return res.status(404).send("Location not found");
  const parameter  = new Parameter({
    RPM :req.body.RPM,
    temperature: req.body.temperature,
    leveltank: req.body.leveltank,
    genre:{
      _id:location._id,
      location:location.location,
    },
    valveA: req.body.valveA,
    valveB: req.body.valveB,
    statusofMachine: req.body.statusofMachine,
    machineID: machine._id,
    datetime: req.body.datetime,
  })

  await parameter.save()
  res.send(parameter)
});
module.exports = router;

