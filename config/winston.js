const winston = require('winston')

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
})
