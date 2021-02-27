const CustomError = require("../Helpers/Error/CustomError");
const asyncwraprapper = require("express-async-handler");
const Customer = require("../Models/Customer");

const allMyCart = asyncwraprapper(async (req, res, next) => {
  const customer = await Customer.findById(req.user.id).populate("carts");

  if (!customer) {
    return res.status(200).jsom({});
  }
  const carts = customer.carts;

  res.status(200).json({
    count: carts.length,
    data: carts,
  });
});

module.exports = allMyCart;
