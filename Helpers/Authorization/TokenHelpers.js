const sendJwtToClient = (customer, response) => {
  const JWT_COOKIE = process.env.JWT_COOKIE;

  const token = customer.generateToken();

  return response
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,

      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 3600),
    })
    .json({
      success: true,
      access_Token: token,
      data: {
        name: customer.name,
        email: customer.email,
      },
    });
};

const isTokenIncluded = (req) => {
  if (req.headers.authorization) {
    return true;
  } else {
    return false;
  }
};
module.exports = {
  sendJwtToClient,
  isTokenIncluded,
};
