const CustomError = require("../Helpers/Error/CustomError");
const asyncwraprapper = require("express-async-handler");
const Product = require("../Models/Product");

const getAllWomanProducts = asyncwraprapper(async (req, res, next) => {
  const allWomanProducts = await Product.find({ categoryId: 1 });

  res.json({
    allWomanProducts,
  });
});

module.exports = getAllWomanProducts;
