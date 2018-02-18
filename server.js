const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth-backend/auth');

const app = express();
const path = require('path');
const cache = require('./auth-backend/redis');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cors')());

if(process.env.NODE_ENV !== 'production') {
	const webpackDevMiddleware = require('./webpack.dev');
  app.use(webpackDevMiddleware);  
  require('dotenv').config();
}

const requireAuthGET = async (req,res,next) => {
  const token = await cache.getAsync('token');

  if(!token) {
  	res.redirect('/login');
  } else {
  	next();
  }
};

const requireNoAuthGET = async (req, res, next) => {
  const token = await cache.getAsync('token');

  if(token) {
  	res.redirect('/');
  } else {
  	next();
  }
};

const next = (req,res,next) => next();

app.post('/signup', auth.signUp);
app.post('/login', auth.login);

app.post('/logout', (req,res) => {
  cache.del(req.body.token);
  res.sendStatus(200);
});


// cannot access these pages unless logged in
app.get('/secret', requireAuthGET, next);
app.get('/logout', requireAuthGET, next);


// must be logged out to access these pages
app.get('/login', requireNoAuthGET, next);
app.get('/signup', requireNoAuthGET, next);


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});
 
const server = app.listen(process.env.PORT || 3000, function() {
});

const requireAuthPOST = (req, res, next) => {
  console.log(req.body);
  next();
};