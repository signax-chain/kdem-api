const { allowedDomains } = require("../constants");

const validateDomain = (req, res, next) => {
  const headers = req.headers;
  if (headers.origin !== undefined) {
    if (!allowedDomains.includes(headers.origin))
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized access" });
  }
  //  else {
  //   if (!allowedDomains.includes(`http://${headers.host}`))
  //     return res
  //       .status(401)
  //       .json({ status: 401, message: "Unauthorized access" });
  // }
  next();
};

module.exports = validateDomain;