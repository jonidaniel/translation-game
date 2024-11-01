/*
Translation Game Backend

Version 0.9.0
Author: Joni Mäkinen
*/

const express = require(`express`);
const app = express();
var cors = require("cors");
const connection = require(`./connection.js`);

const port = 8080;
// Uses primarily the port that Heroku wants
// Secondary port is 8080
// const port = process.env.PORT || 8080;

function main() {
  // My own middleware
  // Is invoked every time any HTTP request is received (before anything else happens)
  // Middleware is useful for authentication purposes
  app.use((req, res, next) => {
    // Add additional HTTP Response header
    res.header("Access-Control-Allow-Origin", "*");
    // IMPLEMENT REAL AUTHENTICATION HERE
    let authenticated = true;
    if (authenticated) {
      // Invoking next proceeds with the application
      next();
    }
  });

  // Default Express.js middleware for CORS
  app.use(cors());

  // Default Express.js middleware
  // Everything under './frontend/build' is shown as is on this server
  // I.e. specifies './frontend/build' as directory from which to serve static files
  app.use(express.static("frontend/build"));

  // Default Express.js middleware especially for HTTP POST
  // Reads the body of HTTP POST request
  // Parses the body and transforms it to JS object
  // Saves the object into req.body
  app.use(express.json());

  // 1. GET all resources from database table
  app.get(`/animal`, (req, res) => {
    connection.getAll((data) => {
      res.send(data);
    });
  });

  // 2. GET single resource from database table
  // :id() injects variable named id into req.params.id
  // It's value is whatever is :id()'s argument
  app.get(`/animal/:id([0-9]+)`, (req, res) => {
    let id = req.params.id;
    connection.getById(id, (data) => {
      if (data) {
        res.send(data);
      } else {
        // Status code 404 is sent to frontend in case matching id isn't found
        req.statusCode = 404;
        res.end();
      }
    });
  });

  // 3. POST single resource to database table
  app.post(`/guess`, (req, res) => {
    let eng = req.body.eng;
    let fin = req.body.fin;
    connection.post(eng, fin, (data) => {
      if (data) {
        res.send(data);
      } else {
        // Status code 201 is sent to frontend !!!!!!!!!!!!!!!!!!!!!!!!!
        res.statusCode = 201;
        res.send(req.body);
      }
    });
  });

  // 4. DELETE single resource from database table
  app.delete(`/animal/:id([0-9]+)`, (req, res) => {
    let id = req.params.id;
    connection.deleteByID(id, (data) => {
      if (data) {
        res.send();
      } else {
        // Status code 204 is sent to frontend !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        res.statusCode = 204;
        res.end();
      }
    });
  });

  // Start HTTP server on given port
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${server.address().port}`);
  });
}

main();
