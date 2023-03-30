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
  const titles = await Machine.find({}, {_id:1, title:1});

  res.send(titles);
});

module.exports = router;
