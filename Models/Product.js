const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  categoryId: {
    type: Number,
    required: true,
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
