const { Router } = require('express');
//const validate = require('express-validation');
const { check } = require('express-validator');

const loginCtrl = require('./login.controller');
const loginCtrlValidator = require('./login.validators');

const router = Router() // eslint-disable-line new-cap

//router.route('/').post(validate(loginCtrlValidator.login), loginCtrl.login)
router.route('/').post(
    [
        check('email').isEmail(),
        check('password').isLength({min: 6}),
    ], loginCtrl.login)
router.route('/otp').post(validate(loginCtrlValidator.otp), loginCtrl.otpLogin)

module.exports = router
