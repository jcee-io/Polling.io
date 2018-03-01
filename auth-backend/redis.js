const redis = require('redis');
const Promise = require('bluebird');

const client = redis.createClient(process.env.REDIS_URL);


module.exports = Promise.promisifyAll(client);