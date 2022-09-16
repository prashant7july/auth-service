const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const speakeasy = require('speakeasy');
const { _, validationResult } = require('express-validator');

const APIError = require('./../../helpers/api-error');
const config = require('./../../config/config');
const isMobileNumber = require('./../../helpers/is-mobile-number');
const isEmailAddress = require('./../../helpers/is-email-address');
const UserRepo = require('./../../repos/user-repo');
const sendOtpEmail = require('./../../emails/otp/otp-email');

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty() && errors.errors[0].param === 'email') {
      return res.status(400).send('Invalid email address. Please try again.')
    }
    if (!errors.isEmpty() && errors.errors[0].param === 'password') {
      return res
        .status(400)
        .send('Password must be longer than 6 characters.')
    }

    let user
    if (isMobileNumber(req.body.email)) {
      user = await UserRepo.loginUserByMobile(req.body.email, req.body.password)
    } else if (isEmailAddress(req.body.email)) {
      user = await UserRepo.loginUserByEmail(req.body.email, req.body.password)
    } else {
      user = await UserRepo.loginUserByUsername(
        req.body.email,
        req.body.password
      )
    }

    if (!user) {
      const err = new APIError('User not found', httpStatus.NOT_FOUND)
      return next(err)
    }

    if (user.is_otp) {
      // TODO: Send an OTP to mobile number or email address
      const token = speakeasy.totp({
        secret: user.otp_secret,
        encoding: 'base32'
      })

      //For Test This Comment Used Because Email Not Work.
      // sendOtpEmail(user.email, {
      //   name: user.name,
      //   otp: token
      // })

      return res.json({
        message: 'One time password was sent to your email.',
        user: {
          user_id: user._id,
          is_otp: user.is_otp,
          otp: token //For Test This Object Used Because Email Not Work.
        }
      })
    }

    //const token = jwt.sign(user.getPublicFields(), config.jwtSecret, { expiresIn: expiresIn, algorithm: 'RS256' });
    const token = jwt.sign(user.getPublicFields(), config.jwtSecret)

    return res.json({
      token,
      user: { _id: user._id, ...user.getPublicFields() }
    })
  } catch (error) {
    const err = new APIError(error.message, httpStatus.UNAUTHORIZED)
    return next(err)
  }
}

/**
 * Verify two factory token.
 * If has temp secret well use it to verify the token
 * Then, save the temp token to the actual token
 * then removes the temp token.
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function otpLogin(req, res, next) {
  try {
    const user = await UserRepo.findById(req.body.user_id)

    if (!user) {
      const err = new APIError('User not found', httpStatus.NOT_FOUND)
      return next(err)
    }

    if (!req.body.token) {
      throw new Error('OTP token was not provided.')
    }

    const verified = speakeasy.totp.verify({
      secret:
        !!user.otp_tmp_secret === true ? user.otp_tmp_secret : user.otp_secret,
      encoding: 'base32',
      token: req.body.token
    })

    if (!verified) {
      throw new Error('Unable to verify token. Please request for a new qrcode')
    }

    user.otp_secret =
      !!user.otp_tmp_secret === true ? user.otp_tmp_secret : user.otp_secret
    user.otp_tmp_secret = ''
    user.is_otp = true
    await user.save()

    const token = jwt.sign(user.getPublicFields(), config.jwtSecret)

    return res.json({
      token,
      user: user.getPublicFields()
    })
  } catch (error) {
    const err = new APIError(error.message, httpStatus.UNAUTHORIZED)
    return next(err)
  }
}

module.exports = { login, otpLogin }
