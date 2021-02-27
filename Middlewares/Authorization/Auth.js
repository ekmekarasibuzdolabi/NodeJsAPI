const CustomError = require("../../Helpers/Error/CustomError");
const { isTokenIncluded } = require("../../Helpers/Authorization/TokenHelpers");
const jwt = require("jsonwebtoken");
const Customer = require("../../Models/Customer");
const asyncrapper = require("express-async-handler");

const getAccessToRoute = (request, response, next) => {
  if (isTokenIncluded(request) === false) {
    return next(new CustomError("You are not authorized to this route", 401));
  }

  const token = request.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this route")
      );
    }

    // requestte user özelliği oluşturuyoruzz.
    request.user = {
      id: decoded.id,
      name: decoded.name,
    };

    next();
  });
};

const getAccesOwnerProduct = asyncrapper(async (req, res, next) => {
  const { productId } = req.params;

  const customer = await Customer.findById(req.user.id);

  if (!customer) {
    return next(new CustomError("No customer with this ID", 400));
  }

  if (customer.carts.includes(productId)) {
    next();
  } else {
    return next(new CustomError("Böyle bir ürün yok sepetinizde", 400));
  }
});

module.exports = {
  getAccesOwnerProduct,
  getAccessToRoute,
};
