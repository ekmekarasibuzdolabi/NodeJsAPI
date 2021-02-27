const express = require("express");
const {
  getAccessToRoute,
  getAccesOwnerProduct,
} = require("../Middlewares/Authorization/Auth");
const route = express.Router();
const payment = require("../Controllers/Payment");

route.get("/:productId", getAccessToRoute, getAccesOwnerProduct, payment);

module.exports = route;
