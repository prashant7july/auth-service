const redis = require('redis');
const config = require('./../config/config');
const logger = require('./create-redis-logger');

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port
})

client.on('ready', function() {
  logger.log('info', 'Successfully connected to server.')
})

client.on('error', function(err) {
  logger.log('error', err.message, {
    name: err.name,
    file: err.fileName,
    stack: err.stack,
    line: err.lineNumber,
    column: err.columnNumber
  })
})

module.exports = client
