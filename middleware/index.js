const verifyAuth = require("./authMiddlaware");
const requestValidator = require("./validatorMiddleware");

module.exports = {
    requestValidator,
    verifyAuth
}