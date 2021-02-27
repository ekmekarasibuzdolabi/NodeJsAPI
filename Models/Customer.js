const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    minlength: [6, "Please provide minglength : 6"],
    required: [true, "Please provide a password"],
    select: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a email that format : @gmail.com",
    ],
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
  ],
  carts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpires: {
    type: Date,
  },
});

CustomerSchema.methods.generateToken = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id: this._id,
    name: this.name,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

  return token;
};

CustomerSchema.methods.getResetPassword = function () {
  const { RESET_PASSWORD_EXPIRE } = process.env;

  const randomString = crypto.randomBytes(15).toString("hex");

  const resetToken = crypto
    .createHash("SHA256")
    .update(randomString)
    .digest("hex");

  this.resetPasswordToken = resetToken;

  this.resetPasswordExpires = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

  return resetToken;
};

CustomerSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("Customer", CustomerSchema);
