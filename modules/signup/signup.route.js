const { Router } = require('express');
const validate = require('express-validation');

const signupCtrl = require('./signup.controller');
const signupCtrlValidator = require('./signup.validators');

const router = Router()

router.route('/').get(signupCtrl.index)
router.route('/verify').get(signupCtrl.verify)
router.route('/').post(validate(signupCtrlValidator.post), signupCtrl.create)

module.exports = router
