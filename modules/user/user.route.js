const { Router } = require('express');
const expressJwt = require('express-jwt');
const validate = require('express-validation');
const userCtrl = require('./user.controller');
const userCtrlValidator = require('./user.validators');
const config = require('./../../config/config');
const requireOtp = require('./../../middlewares/otp-middleware');

const router = Router()
// OR
// get an instance of router
// var router = express.Router();

// Error: secret should be set - config.js check and check the .env path
const requireAuth = expressJwt({ secret: config.jwtSecret })

router.route('/').get(requireAuth, userCtrl.user)

router
  .route('/email')
  .post(
    requireAuth,
    validate(userCtrlValidator.email),
    requireOtp,
    userCtrl.email
  )

router.route('/email').get(userCtrl.emailVerify)

router
  .route('/password')
  .post(
    requireAuth,
    validate(userCtrlValidator.password),
    requireOtp,
    userCtrl.password
  )

router
  .route('/profile')
  .post(
    requireAuth,
    validate(userCtrlValidator.email),
    requireOtp,
    userCtrl.profile
  )

module.exports = router
