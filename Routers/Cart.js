const express = require("express");
const allMyCart = require("../Controllers/Cart");
const router = express.Router();
const { getAccessToRoute } = require("../Middlewares/Authorization/Auth");

router.get("/", getAccessToRoute, allMyCart);

module.exports = router;
