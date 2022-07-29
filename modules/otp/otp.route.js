const { Router } = require('express');
const expressJwt = require('express-jwt');

const otpCtrl = require('./otp.controller');
const config = require('./../../config/config');

const router = Router()
const jwtConfig = expressJwt({ secret: config.jwtSecret })

router.route('/').post(jwtConfig, otpCtrl.create)
router.route('/').put(jwtConfig, otpCtrl.update)
router.route('/').delete(jwtConfig, otpCtrl.destroy)

module.exports = router
