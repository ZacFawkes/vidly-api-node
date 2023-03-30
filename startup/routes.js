const express = require("express");
const locations = require("../routes/locations");
const titles = require("../routes/titles");
const machines = require("../routes/machines");
const parameters = require("../routes/parameters");
const specifiedparameters = require("../routes/specifiedparameters");
const error = require("../middleware/error");
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/locations", locations);
  app.use("/api/parameters", parameters);
  app.use("/api/machines", machines);
  app.use("/api/titles", titles);
  app.use("/api/specifiedparameters", specifiedparameters);
  app.use('/api/users', users);
  app.use('/api/auth', auth);

  app.use(error);
};
