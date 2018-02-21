const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth-backend/auth');

const app = express();
const path = require('path');
const cache = require('./auth-backend/redis');
const db = require('./database/index');

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

const requireToken = async (req, res, next) => {
  req.body = req.body || {};
  req.query = req.query || {};
  const token = await cache.getAsync(req.body.token || req.query.token);
  if(token) {
    next();
  } else {
    res.sendStatus(403);
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
app.get('/logout', requireAuthGET, next);
app.get('/api/polls/:username', requireToken, async(req,res) => {
  const polls = await db.getPolls(req.query.username);

  res.json({ polls });
});

// must be logged out to access these pages
app.get('/login', requireNoAuthGET, next);
app.get('/signup', requireNoAuthGET, next);

// create poll

app.post('/create',  requireToken, async (req, res) => {
  const { username, title, choices } = req.body;
  const choicesArr = Object.keys(choices).map(index => choices[index]);

  console.log(choicesArr);

  await db.createPoll(username, title, choicesArr);
  res.sendStatus(200);
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});
 
const server = app.listen(process.env.PORT || 3000, function(err) {
  if(err) {
    console.log(err);
  }
});

