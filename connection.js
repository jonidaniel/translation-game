const mysql = require(`mysql`);
require("dotenv").config();

// Creates the database connection variable
// So called 'configuration object'

// Variables' values are stored Heroku
var pool = mysql.createPool({
  // Maximum 10 connections at the same time
  connectionLimit: 10,
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

/*
// Outputs notification when a connection is acquired from the connection pool
// FOR TESTING
pool.on("acquire", function (connection) {
  console.log("---");
  console.log("Connection %d acquired", connection.threadId);
});

// Outputs notification when a connection is released back to the connection pool
// FOR TESTING
pool.on("release", function (connection) {
  console.log("---");
  console.log("Connection %d released", connection.threadId);
});
*/

let connectionFunctions = {
  // 1. GETS all resources from the database table
  getAll: (callbackFn) => {
    pool.query(`SELECT * FROM animal`, (error, results) => {
      if (error) {
        callbackFn(error);
      } else {
        callbackFn(results);
      }
    });
  },
  // 2. GETS a single resource from the database table
  getById: (id, callbackFn) => {
    pool.query(`SELECT * FROM animal WHERE id = ${id}`, (error, results) => {
      if (error) {
        callbackFn(error);
      } else {
        // Looks for the animal with the right id,
        // i.e. makes sure there is an animal with the desired id
        let result = results.find((animal) => animal.id == id);
        if (result) {
          callbackFn(result);
        } else {
          callbackFn(false);
        }
      }
    });
  },
  // 3. POSTS a single resource to the database table
  post: (eng, fin, callbackFn) => {
    pool.query(
      `INSERT INTO animal (eng, fin) VALUES ('${eng}', '${fin}')`,
      (error) => {
        if (error) {
          callbackFn(error);
        } else {
          callbackFn(false);
        }
      }
    );
  },
  // 4. DELETES a single resource from the database table
  deleteByID: (id, callbackFn) => {
    pool.query(`DELETE FROM animal WHERE id = ${id}`, (error) => {
      if (error) {
        callbackFn(error);
      } else {
        callbackFn(false);
      }
    });
  },
  // Ends the connection to the database
  // Waits for all queries to finish before ending the connection
  end: () => {
    pool.end();
  },
};

module.exports = connectionFunctions;
