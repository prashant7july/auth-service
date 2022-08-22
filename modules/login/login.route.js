const { Router } = require('express');
//const validate = require('express-validation');
const { body, validationResult } = require('express-validator');

const loginCtrl = require('./login.controller');
const loginCtrlValidator = require('./login.validators');

const router = Router() // eslint-disable-line new-cap

//router.route('/').post(validate(loginCtrlValidator.login), loginCtrl.login)
router.route('/').post(
    [
        body('email').isEmail(),
        body('password').isLength({min: 6}),
    ], loginCtrl.login)
router.route('/otp').post(body(loginCtrlValidator.otp), loginCtrl.otpLogin)

module.exports = router
