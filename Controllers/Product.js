const asyncrapper = require("express-async-handler");
const CustomError = require("../Helpers/Error/CustomError");
const Customer = require("../Models/Customer");
const Product = require("../Models/Product");

const addProduct = asyncrapper(async (req, res, next) => {
  const { categoryId, profile_image, name, price } = req.body;

  const newP = await Product.create({
    categoryId,
    profile_image,
    name,
    price,
  });

  res.json({
    messageg: newP,
  });
});

const getAllProducts = asyncrapper(async (req, res, next) => {
  res.json(res.results);
});

const getSingleProduct = asyncrapper(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  res.json({
    product,
  });
});

const addToCart = asyncrapper(async (req, res, next) => {
  const { productId } = req.params;

  const customer = await Customer.findById(req.user.id);

  customer.carts.push(productId);

  await customer.save();

  res.json({
    customer,
  });
});

const deleteFromCart = asyncrapper(async (req, res, next) => {
  const { productId } = req.params;

  const customer = await Customer.findById(req.user.id);

  const index = customer.carts.indexOf(productId);

  customer.carts.splice(index, 1);

  await customer.save();

  res.json({
    customer,
  });
});

const likeProduct = asyncrapper(async (req, res, next) => {
  const { productId } = req.params;

  const customer = await Customer.findById(req.user.id);

  if (customer.likes.includes(productId)) {
    return next(new CustomError("Bu ürünü zaten beğenmişsiniz", 400));
  }

  customer.likes.push(productId);

  await customer.save();

  res.json({
    customer,
  });
});

const undoLikeProduct = asyncrapper(async (req, res, next) => {
  const { productId } = req.params;

  const customer = await Customer.findById(req.user.id);

  if (customer.likes.includes(productId)) {
    const index = customer.likes.indexOf(productId);
    customer.likes.splice(index, 1);
  }
  await customer.save();

  res.json({
    customer,
  });
});

module.exports = {
  getAllProducts,
  addProduct,
  getSingleProduct,
  addToCart,
  likeProduct,
  undoLikeProduct,
  deleteFromCart,
};
