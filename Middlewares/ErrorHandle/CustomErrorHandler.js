const CustomError = require("../../Helpers/Error/CustomError");

const CustomErrorhandling = (err, req, res, next) => {
  let newError = err;
  console.log(err);

  if (err.name === "ValidationError") {
    newError = new CustomError(err.message, 400);
  }

  if (err.code === 11000) {
    newError = new CustomError(
      "Giriş yaptığınız değerleri kontrol ediniz !",
      400
    );
  }

  res.status(newError.status || 500).json({
    success: false,
    message: newError.message,
  });
};

module.exports = CustomErrorhandling;
