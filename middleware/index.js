const verifyAuth = require("./authMiddlaware");
const validator = require("./validatorMiddleware");

module.exports = {
    validator,
    verifyAuth
}