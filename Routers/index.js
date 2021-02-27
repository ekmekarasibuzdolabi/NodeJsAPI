const express = require("express");
const router = express.Router();
const authRoute = require("./Auth");
const cartRoute = require("./Cart");
const womanRoute = require("./Woman");
const manRoute = require("./Man");
const babyRoute = require("./Baby");
const productRoute = require("./Product");
const paymentRoute = require("./Payment");

router.use("/auth", authRoute);
router.use("/my-cart", cartRoute);
router.use("/woman", womanRoute);
router.use("/man", manRoute);
router.use("/baby", babyRoute);
router.use("/", productRoute);
router.use("/payment", paymentRoute);

module.exports = router;
