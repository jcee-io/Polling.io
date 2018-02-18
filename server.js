const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth-backend/auth');
const webpackDevMiddleware = require('./webpack.dev');
const app = express();
const path = require('path');
const cache = require('./auth-backend/redis');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cors')());

if(process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware);  
  require('dotenv').config();
}

console.log(process.env.SECRET_KEY);

const requireAuthGET = async (req,res,next) => {
  const token = await cache.getAsync('token');

  console.log(token);

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


app.get('/favicon.ico', (req, res) => {
	res.end();
});
app.post('/signup', auth.signUp);
app.post('/login', auth.login);

app.post('/logout', (req,res) => {
  cache.del('token');
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
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Example app listening at http://${host}:${port}`);
});

const requireAuthPOST = (req, res, next) => {
  console.log(req.body);
  next();
};