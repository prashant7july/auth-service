const { expressjwt: jwt } = require("express-jwt");
const config = require('./../config/config');

module.exports = jwt({ secret: config.jwtSecret, algorithms: ["HS256"] });