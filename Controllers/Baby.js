const CustomError = require("../Helpers/Error/CustomError");
const Product = require("../Models/Product");
const asyncrapper = require("express-async-handler");

const getAllBabyProducts = asyncrapper(async (req, res, next) => {
  const allBabyProducts = await Product.find({ categoryId: 3 });

  res.json({
    allBabyProducts,
  });
});

module.exports = getAllBabyProducts;
