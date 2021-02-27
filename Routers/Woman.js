const express = require("express");
const router = express.Router();
const getAllWomanProducts = require("../Controllers/Woman");

router.get("/", getAllWomanProducts);

module.exports = router;
