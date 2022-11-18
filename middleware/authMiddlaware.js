const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const API_SECRET = require("../config/config.json")["apiSecret"];
const { User } = require("../models");

const verifyToken = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    try {
      const decoded = await jwt.verify(
        req.headers.authorization.split(" ")[1],
        API_SECRET
      );
        console.log(decoded);
      const user = await User.findOne({
        where: { id: decoded.id },
      });

      if (user) {
        req.user = user;
        next();
      }

    } catch (err) {
      req.user = undefined;
      next(createHttpError(401, err));
    }

  } else {
    next(createHttpError(401, "Unauthorized"));
  }
};
module.exports = verifyToken;
