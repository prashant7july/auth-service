const { Router } = require('express');
//var { expressjwt: jwt } = require("express-jwt")

const otpCtrl = require('./otp.controller');
const config = require('./../../config/config');

const router = Router()
//const jwtConfig = jwt({ secret: config.jwtSecret, algorithms: ["HS256"] })
const jwtConfig = require('./../../helpers/auth.middleware');

router.route('/').post(jwtConfig, otpCtrl.create)
router.route('/').put(jwtConfig, otpCtrl.update)
router.route('/').delete(jwtConfig, otpCtrl.destroy)

module.exports = router
