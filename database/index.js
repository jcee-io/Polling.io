const Promise = require('bluebird');
const db = Promise.promisifyAll(require('mysql2'));
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const schemaConstructor = require('./schema');

if(process.env.NODE_ENV !== "production") {
	require('dotenv').config();
}

const connection = db.createConnection(process.env.MARIADB_URL || require('../connectionSQL'));

schemaConstructor(connection);

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


module.exports.findOne = async (username, callback) => {
	try {
	  let users = await connection.queryAsync(`
		SELECT * FROM Users
		WHERE username = ?
		`, username);

		callback(null, users[0]);
	} catch(err) {
		callback(err, null);
	}
};

module.exports.verifyPassword = async password => {
  return await bcrypt.compareAsync(password, user.password);
};
module.exports.login = async (username, password) => {
  let users = await connection.queryAsync(`
		SELECT * FROM Users
		WHERE username = ?
  	`, username);
  
  const user = users[0]; 

  console.log(user);

  if(user) {
  	const compare = await bcrypt.compareAsync(password, user.password);
  	
  	if(compare) {
  		return false;
  	}

  	return { error: 'Invalid credentials' };
  } else {
  	return { error: 'user does not exist' };
  }
};