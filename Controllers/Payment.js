const asyncrapper = require("express-async-handler");
const { findById } = require("../Models/Customer");
const Customer = require("../Models/Customer");
const Order = require("../Models/Order");
const Product = require("../Models/Product");
const payment = asyncrapper(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  const totalPrice = product.price;
  const customer = await Customer.findById(req.user.id);
  const customerId = req.user.id;
  const newOrder = await Order.create({
    customerId,
    totalPrice,
  });
  customer.orders.push(newOrder);
  res.json({
    newOrder: newOrder,
    orders: customer.orders,
  });
});

module.exports = payment;
