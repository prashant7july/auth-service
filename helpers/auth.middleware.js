//const { expressjwt: jwt } = require("express-jwt"); this is used for the version of "express-jwt": "^7.4.3" in package.json & an return value is in req.auth
const jwt = require("express-jwt"); //this is used for the version of "express-jwt": "^6.1.1" in package.json & an return value is in req.user
const config = require("./../config/config");

module.exports = jwt({ secret: config.jwtSecret, algorithms: ["HS256"] });

/*
const jwt = require('jsonwebtoken');
const config = require('./../config/config');
module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  const verified = jwt.verify(token, config.jwtSecret);
  if(verified){
    req.user = verified
    next()
    //return res.send("Successfully Verified");
  }else{
    // Access Denied
    //return res.status(401).send(error);
    return res.sendStatus(403)
  }
}
*/