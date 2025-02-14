const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  console.log("run");
});

routes.use("/crud", require('./crudRoute'));


module.exports = routes;
