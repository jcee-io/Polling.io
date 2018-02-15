const jwt = require('jwt-simple');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const secretKey = require('../config');
const user = require('../database/index');

const getToken = username => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: username, iat: timestamp }, secretKey);
};


exports.signUp = async (req, res) => {
  const { username, email } = req.body;
  const salt = await bcrypt.genSaltAsync(10);
  const password = await bcrypt.hashAsync(req.body.password, salt);

  const userExists = await user.signUp(username, password, email, res);

  console.log(userExists);

  if(!userExists) {
    const token = getToken(username);
    res.json({ token });
  } else {
  	res.json(userExists)
  }

};

