module.exports = async connection => {
	await connection.connect();
	
	await connection.queryAsync('CREATE DATABASE IF NOT EXISTS Polling');
	await connection.queryAsync('USE Polling');
	

	await connection.queryAsync(
		`CREATE TABLE IF NOT EXISTS Users (
			id INTEGER PRIMARY KEY AUTO_INCREMENT,
			username VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			email VARCHAR(255)
		 )`
	);

  await connection.queryAsync(
    `CREATE TABLE IF NOT EXISTS Poll (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES Users(id)
    )`
  );

  await connection.queryAsync(
    `CREATE TABLE IF NOT EXISTS PollOptions (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      votes INTEGER,
      poll_id INTEGER,
      FOREIGN KEY(poll_id) REFERENCES Poll(id)
    )`
  );
}