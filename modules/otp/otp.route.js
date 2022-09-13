const { Router } = require('express');
const otpCtrl = require('./otp.controller');
const requireAuth = require('./../../middlewares/jwt-middleware');
const router = Router()

router.route('/').post(requireAuth, otpCtrl.create)
router.route('/').put(requireAuth, otpCtrl.update)
router.route('/').delete(requireAuth, otpCtrl.destroy)

module.exports = router
