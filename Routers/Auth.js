const express = require("express");
const router = express.Router();
const {
  signupController,
  signinController,
  signoutController,
  resetPasswordController,
  forgotPasswordController,
  editCustomerController,
} = require("../Controllers/Auth");

const { getAccessToRoute } = require("../Middlewares/Authorization/Auth");

router.post("/sign-up", signupController);

router.post("/sign-in", signinController);

router.get("/sign-out", signoutController);

router.put("/reset-password", resetPasswordController);

router.post("/forgot-password", forgotPasswordController);

router.put("/edit", getAccessToRoute, editCustomerController);

module.exports = router;
