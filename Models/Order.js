const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerId: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
