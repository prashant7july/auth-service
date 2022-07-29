const client = require('./create-redis-client')
const uuid4 = require('uuid/v4')

module.exports = function(channel, topic, event, payload) {
  const ref = uuid4()
  const data = {
    topic,
    event,
    payload,
    ref
  }

  client.publish(channel, JSON.stringify(data))

  return data
}
