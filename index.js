/*
Translation Game Backend

Author: Joni Mäkinen
*/

const express = require(`express`);
const app = express();
var cors = require("cors");
const connection = require(`./connection.js`);

// Uses primarily the port that Heroku wants
// Secondary port is 8080
const port = 8080;
// const port = process.env.PORT || 8080;

function main() {
  // My own middleware
  // Is invoked every time any HTTP request is received before anything else happens
  // Middleware generally is useful for authentication purposes
  app.use((req, res, next) => {
    // Adds additional HTTP Response header
    res.header("Access-Control-Allow-Origin", "*");
    // IMPLEMENT REAL AUTHENTICATION HERE
    let authenticated = true;
    if (authenticated) {
      // Invoking 'next' proceeds with the application
      // Application will stop here if 'next' isn't invoked
      next();
    }
  });

  // Default Express.js middleware for CORS
  app.use(cors());

  // Default Express.js middleware
  // Everything under './frontend/build' is shown as is on this server
  // I.e. specifies './frontend/build' as a directory from which to serve static files
  app.use(express.static("frontend/build"));

  // Default Express.js middleware especially for HTTP POST
  // Reads the body of HTTP POST request
  // Parses the body and transforms it to a JavaScript object
  // Saves the object into 'req.body'
  app.use(express.json());

  // 1. GETS all resources from the database table
  app.get(`/animal`, (req, res) => {
    connection.getAll((data) => {
      res.send(data);
    });
  });

  // 2. GETS a single resource from the database table
  // :id() injects a variable named id into req.params.id
  // It's value is whatever is :id()'s argument
  app.get(`/animal/:id([0-9]+)`, (req, res) => {
    let id = req.params.id;
    connection.getById(id, (data) => {
      if (data) {
        res.send(data);
      } else {
        // Status code 404 is sent to frontend in case a matching id wasn't found
        req.statusCode = 404;
        res.end();
      }
    });
  });

  // 3. POSTS a single resource to the database table
  app.post(`/animal`, (req, res) => {
    let eng = req.body.eng;
    let fin = req.body.fin;
    connection.post(eng, fin, (data) => {
      if (data) {
        res.send(data);
      } else {
        // Status code 201 is sent to frontend
        res.statusCode = 201;
        res.send(req.body);
      }
    });
  });

  // 4. DELETES a single resource from the database table
  app.delete(`/animal/:id([0-9]+)`, (req, res) => {
    let id = req.params.id;
    connection.deleteByID(id, (data) => {
      if (data) {
        res.send();
      } else {
        // Status code 204 is sent to frontend
        res.statusCode = 204;
        res.end();
      }
    });
  });

  // Starts the HTTP server on given port
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${server.address().port}`);
  });
}

main();
