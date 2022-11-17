const jwt = require("jsonwebtoken");
const { User } = require("../models");
const API_SECRET = require('../config/config.json')["apiSecret"];
module.exports = {
  signIn: async (reqEmail) => {
    const user = await User.findOrCreate({
      where: { email: reqEmail },
      defaults: { email: reqEmail },
    });
    const {id, email} = user[0];

    const token = jwt.sign({
        id,
        email
      }, API_SECRET, {
        expiresIn: 1800
      });



      return {
        success: true,
        data: {
            user: {
                id,
                email
            },
            accessToken: token
        }
      }
    
  },
};
