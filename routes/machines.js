const { Machine, validate } = require("../models/machine");
const { Location } = require("../models/location");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const machines = await Machine.find().select("-__v").sort("name");
  res.send(machines);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const location = await Location.findById(req.body.genreId);

  if (!location) return res.status(400).send("Invalid location.");

  const machine = new Machine({
    title: req.body.title,
    genre: {
      _id: location._id,
      location: location.location,
    },
    hourofOperating: req.body.hourofOperating,
    PM: req.body.PM,
  });
  await machine.save();

  res.send(machine); 
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const location = await Location.findById(req.body.genreId);
  if (!location) return res.status(400).send("Invalid location.");

  const machine = await Machine.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: location._id,
        location: location.location,
      },
      hourofOperating: req.body.hourofOperating,
      PM: req.body.PM,
    },
    { new: true }
  );

  if (!machine)
    return res.status(404).send("The machine with the given ID was not found.");

  res.send(machine);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const machine = await Machine.findByIdAndRemove(req.params.id);

  if (!machine)
    return res.status(404).send("The machine with the given ID was not found.");

  res.send(machine);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const machine = await Machine.findById(req.params.id).select("-__v");

  if (!machine)
    return res.status(404).send("The machine with the given ID was not found.");

  res.send(machine);
});

module.exports = router;
