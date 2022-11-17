const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const API_SECRET = require('../config/config.json')["apiSecret"];
const { User } = require("../models");

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      API_SECRET,
      async function (err, decode) {
        // console.log(err);
        if (err)  {
          req.user = undefined;
           next( createHttpError(401, err))
        }
            
        const user = await User.findOne({
          where: { id: decode.id },
        });

        if(user){
            req.user = user;
            next();
        }
      }
      
    );
  } else {
    next (createHttpError(401, "Unauthorized"));
  }
};
module.exports = verifyToken;
