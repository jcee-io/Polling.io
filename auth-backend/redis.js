const redis = require('redis');
const Promise = require('bluebird');

const client = redis.createClient();


module.exports = Promise.promisifyAll(client);