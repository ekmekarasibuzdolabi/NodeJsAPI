const express = require("express");
const router = express.Router();
const getAllBabyProducts = require("../Controllers/Baby");

router.get("/",getAllBabyProducts);

module.exports = router;
