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
}

const requireAuthGET = async (req,res,next) => {
  const token = await cache.getAsync('token');

  console.log(req, token);

  if(!token) {
  	res.redirect('/login');
  } else {
  	next();
  }
};




app.get('/favicon.ico', (req, res) => {
	res.end();
});
app.post('/signup', auth.signUp);
app.post('/login', auth.login);
app.get('/secret', requireAuthGET, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Example app listening at http://${host}:${port}`);
});




const requireAuthPOST = (req, res, next) => {

};