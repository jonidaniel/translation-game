const mysql = require(`mysql2`);
require("dotenv").config();

// Create database connection variable (here: connection pool), i.e. configuration object
var pool = mysql.createPool({
  // Maximum 10 connections at a time
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_DB,
});

// Output notification when connection is acquired from connection pool (for testing)
pool.on("acquire", (connection) => {
  // FUNCTION (CONNECTION) JA => POIS!!!!!!!!!!!!!!!!!!!!!!!!!!
  console.log("---");
  console.log("Connection %d acquired", connection.threadId);
});

// Output notification when connection is released back to connection pool (for testing)
pool.on("release", (connection) => {
  console.log("---");
  console.log("Connection %d released", connection.threadId);
});

let connectionFunctions = {
  // 1. GET all resources from database table
  getAll: (callbackFn) => {
    pool.query(`SELECT * FROM animal`, (error, results) => {
      if (error) {
        callbackFn(error);
      } else {
        callbackFn(results);
      }
    });
  },
  // 2. GET single resource from database table
  getById: (id, callbackFn) => {
    pool.query(`SELECT * FROM animal WHERE id = ${id}`, (error, results) => {
      if (error) {
        callbackFn(error);
      } else {
        // Look for animal with right id,
        // i.e. make sure there is animal with desired id
        let result = results.find((animal) => animal.id == id);
        if (result) {
          callbackFn(result);
        } else {
          callbackFn(false);
        }
      }
    });
  },
  // 3. POST single resource to database table
  post: (eng, fin, callbackFn) => {
    pool.query(
      `INSERT INTO guess (eng, fin) VALUES ('${eng}', '${fin}')`,
      (error) => {
        if (error) {
          callbackFn(error);
        } else {
          callbackFn(false);
        }
      }
    );
  },
  // post: (callbackFn) => {
  //   pool.query(
  //     `CREATE TABLE animal (
  //       id int NOT NULL AUTO_INCREMENT,
  //       eng VARCHAR(255) NOT NULL,
  //       fin VARCHAR(255) NOT NULL,
  //       PRIMARY KEY (id)
  //     );
  //     INSERT INTO animal (eng, fin)
  //     VALUES ("Bear", "Karhu"),
  //       ("Eagle", "Kotka"),
  //       ("Wolf", "Susi"),
  //       ("Snake", "Käärme"),
  //       ("Dog", "Koira"),
  //       ("Cat", "Kissa"),
  //       ("Pig", "Sika"),
  //       ("Fly", "Kärpänen"),
  //       ("Fish", "Kala"),
  //       ("Shark", "Hai"),
  //       ("Mouse", "Hiiri"),
  //       ("Rat", "Rotta"),
  //       ("Bee", "Mehiläinen"),
  //       ("Wasp", "Ampiainen"),
  //       ("Deer", "Peura"),
  //       ("Monkey", "Apina"),
  //       ("Rabbit", "Jänis"),
  //       ("Fox", "Kettu"),
  //       ("Cow", "Lehmä"),
  //       ("Squirrel", "Orava"),
  //       ("Goose", "Hanhi"),
  //       ("Duck", "Sorsa")
  //       ("Bat", "Lepakko");`,
  //     (error) => {
  //       if (error) {
  //         callbackFn(error);
  //       } else {
  //         callbackFn(false);
  //       }
  //     }
  //   );
  // },
  // 4. DELETE single resource from database table
  deleteByID: (id, callbackFn) => {
    pool.query(`DELETE FROM animal WHERE id = ${id}`, (error) => {
      if (error) {
        callbackFn(error);
      } else {
        callbackFn(false);
      }
    });
  },
  // End connection to database
  // Waits for all queries to finish before ending connection
  end: () => {
    pool.end();
  },
};

module.exports = connectionFunctions;
