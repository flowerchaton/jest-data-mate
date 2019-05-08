const mongoTools = require('./tools/mongo')
const redisTools = require('./tools/redis')
module.exports = {
    mongo: mongoTools,
    redis: redisTools,
}