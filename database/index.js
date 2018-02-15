const Promise = require('bluebird');
const db = Promise.promisifyAll(require('mysql'));
const connectionSQL = require('../connectionSQL');

const connection = db.createConnection(connectionSQL);



(async () => {
	await connection.connect();
	await connection.query('CREATE DATABASE IF NOT EXISTS App');
	await connection.query('USE App');
	await connection.query(
		`CREATE TABLE IF NOT EXISTS Users (
			id INTEGER PRIMARY KEY AUTO_INCREMENT,
			username VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			email VARCHAR(255)
		 )`
	);
})();
