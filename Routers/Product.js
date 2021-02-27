const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  addToCart,
  likeProduct,
  undoLikeProduct,
  deleteFromCart,
} = require("../Controllers/Product");
const { getAccessToRoute } = require("../Middlewares/Authorization/Auth");
const productQueryMiddleware = require("../Middlewares/Query/ProductQuery");

router.post("/add", addProduct);
router.get("/", productQueryMiddleware(), getAllProducts);
router.get("/:productId", getSingleProduct);
router.get("/:productId/add-to-cart", getAccessToRoute, addToCart);
router.get("/:productId/like", getAccessToRoute, likeProduct);
router.get("/:productId/undolike", getAccessToRoute, undoLikeProduct);
router.get("/:productId/delete", getAccessToRoute, deleteFromCart);

module.exports = router;
