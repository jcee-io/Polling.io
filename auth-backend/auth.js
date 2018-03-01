const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

const user = require('../database/index');
const cache = require('./redis');

if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const secretKey = process.env.SECRET_KEY;

const getToken = username => {
  return new Promise((resolve, reject) => {
  	jwt.sign({ username }, secretKey, (err, token) => {
  		if(err) {
  			reject(err);
  		} else {
  			resolve(token);
  		}
  	});
  });
};


exports.signUp = async (req, res) => {
  const { username, email } = req.body;
  const salt = await bcrypt.genSaltAsync(10);
  const password = await bcrypt.hashAsync(req.body.password, salt);

  const userExists = await user.signUp(username, password, email, res);

  console.log(userExists);

  if(!userExists) {
    const token = await getToken(username);


    await cache.setAsync(token, true);

    res.json({ token });
  } else {
  	res.json(userExists)
  }

};

exports.login = async(req,res) => {

  const error = await user.login(req.body.username, req.body.password);

  if(!error) {
    const token = await getToken(req.body.username);
    console.log(token);
    await cache.setAsync(token, true);
    res.json({ token });	
  } else {
  	res.json(error);
  }
};

