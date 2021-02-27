const CustomError = require("../Helpers/Error/CustomError");
const asyncrapper = require("express-async-handler");
const Product = require("../Models/Product");

const getAllManProducts = asyncrapper(async (req, res, next) => {
  const allManProducts = await Product.find({ categoryId: 2 });

  res.json({
    getAllManProducts,
  });
});

module.exports = getAllManProducts;
