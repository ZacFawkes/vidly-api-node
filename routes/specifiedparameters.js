const { Parameter, validate } = require("../models/parameter");
const { Location } = require("../models/location");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
  
  const titles = await Parameter.find({machineID:id}, {machineID:1,temperature:1, RPM:1, valveA:1, valveB:1, leveltank:1});

  res.send(titles);
});

module.exports = router;
