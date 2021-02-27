const express = require("express");
const CustomError = require("../Helpers/Error/CustomError");
const asyncwraprapper = require("express-async-handler");
const Customer = require("../Models/Customer");
const { sendJwtToClient } = require("../Helpers/Authorization/TokenHelpers");
const bcrypt = require("bcryptjs");
const SendEmail = require("../Helpers/NodeMailer/SendEmail");

const signupController = asyncwraprapper(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newCustomer = await Customer.create({
    name,
    email,
    password,
  });

  sendJwtToClient(newCustomer, res);
});

const signinController = asyncwraprapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const loginCustomer = await Customer.findOne({ email }).select("+password");

  if (!bcrypt.compareSync(password, loginCustomer.password)) {
    return next(new CustomError("Password match error", 400));
  }

  sendJwtToClient(loginCustomer, res);
});

const signoutController = asyncwraprapper(async (req, res, next) => {
  res
    .status(200)
    .cookie({
      expires: 0,
      httpOnly: true,
    })
    .json({
      message: "Process completed",
    });
});

const forgotPasswordController = asyncwraprapper(async (req, res, next) => {
  const resetEmail = req.body.email;

  const unutanKisi = await Customer.findOne({ email: resetEmail });

  if (!unutanKisi) {
    return next(new CustomError("There is no user with that email", 400));
  }

  const resetToken = unutanKisi.getResetPassword();

  const resetPasswordURL =
    "http://localhost:5000/auth/reset-password?token=" + resetToken;

  const emailTemplate = `
      <h3> Reset your password </h3>
      <p> This <a href = '${resetPasswordURL}' target = '_blank'> link </a> will expire in 1 hour </p>
  `;

  await unutanKisi.save();

  try {
    await SendEmail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "Reset your password",
      html: emailTemplate,
    }).catch(console.err);

    res.status(200).json({
      success: true,
      message: "Token Sent To Your Email",
    });
  } catch (err) {
    console.log(err);
    unutanKisi.resetPasswordToken = undefined;
    unutanKisi.resetPasswordExpires = undefined;

    await unutanKisi.save();

    return next(new CustomError("Hata var ", 500));
  }
});

const resetPasswordController = asyncwraprapper(async (req, res, next) => {
  const { token } = req.query;

  const { password } = req.body;

  const newUser = await Customer.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!newUser) {
    return next(new CustomError("Invalid Token or Session Expired", 404));
  }

  newUser.password = password;

  newUser.resetPasswordToken = undefined;
  newUser.resetPasswordExpires = undefined;

  await newUser.save();

  res.status(200).json({
    newUser,
  });
});

const editCustomerController = asyncwraprapper(async (req, res, next) => {
  const informations = req.body;

  const newUser = await Customer.findByIdAndUpdate(req.user.id, informations, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    newUser,
  });
});

module.exports = {
  signinController,
  signupController,
  signoutController,
  resetPasswordController,
  forgotPasswordController,
  editCustomerController,
};
