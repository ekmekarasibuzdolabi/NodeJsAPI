const express = require("express");
const router = express.Router();
const getAllManProducts = require("../Controllers/Man");

router.get("/", getAllManProducts);

module.exports = router;
