const Promise = require('bluebird');
const db = Promise.promisifyAll(require('mysql2'));
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const connectionSQL = require('../connectionSQL');

const connection = db.createConnection(connectionSQL);



(async () => {
	await connection.connect();
	await connection.queryAsync('CREATE DATABASE IF NOT EXISTS App');
	await connection.queryAsync('USE App');
	await connection.queryAsync(
		`CREATE TABLE IF NOT EXISTS Users (
			id INTEGER PRIMARY KEY AUTO_INCREMENT,
			username VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			email VARCHAR(255)
		 )`
	);
})();

module.exports.signUp = async (username, password, email) => {
  let users = await connection.queryAsync(`
		SELECT * FROM Users
		WHERE username = ? OR email = ?
  	`, [username, email]);
  
  const user = users[0];

  if(!users[0]) {
  	await connection.queryAsync(`
  		INSERT INTO Users (username, password, email)
  		VALUES(?, ?, ?)
  	`, [username, password, email]);

  	return false;
  } 

  console.log(users[0]);

  if(user.username === username) {
  	return { error: 'That username exists' };
  } else {
  	return { error: 'That email exists' };
  }
};

exports.login = async (username, password) => {
  let users = await connection.queryAsync(`
		SELECT * FROM Users
		WHERE username = ?
  	`, username);
  
  const user = users[0]; 

  if(user) {
  	const compare = await bcrypt.compareAsync(password, user.password);
  	console.log(compare);
  } else {
  	console.log('user does not exist');
  }
};