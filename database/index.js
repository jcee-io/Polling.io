const Promise = require('bluebird');
const db = Promise.promisifyAll(require('mysql2'));
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
  let users= await connection.queryAsync('SELECT ? FROM Users', username);
  
  if(!users[0]) {
  	await connection.queryAsync(`
  		INSERT INTO Users (username, password, email)
  		VALUES(?, ?, ?)
  	`, [username, password, email]);
  } else {
  	console.log('That user already exists');
  }
};