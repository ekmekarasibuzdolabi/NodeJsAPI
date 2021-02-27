const searchHelper = require("../../Helpers/Search/Search");
const asyncrapper = require("express-async-handler");
const productSortHelper = require("../../Helpers/Sort/ProductSort");

const Product = require("../../Models/Product");

const productQueryMiddleware = function () {
  return asyncrapper(async (req, res, next) => {
    let query = Product.find();

    query = searchHelper("name", req, query);

    query = productSortHelper(query, req);

    const results = await query;

    res.results = {
      results,
    };
    next();
  });
};

module.exports = productQueryMiddleware;
