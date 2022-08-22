const { Router } = require('express');
const validate = require('express-validation');

const resetCtrl = require('./reset.controller');
//const resetCtrlValidator = require('./reset.validators');

const router = Router()

router.route('/').get(resetCtrl.index)
router.route('/').post(
    //validate(resetCtrlValidator.post),
    resetCtrl.create
)
router.route('/').put(
    //validate(resetCtrlValidator.put),
    resetCtrl.update
)

module.exports = router
