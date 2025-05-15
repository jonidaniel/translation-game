/*
Translation Game Backend

Version 0.9.0
Author: Joni Mäkinen
*/

const express = require("express");
const server = express();
const cors = require("cors");
const connection = require("./connection.js");

const port = 8080;
// Use primarily the port that Heroku wants
// Secondary port is 8080
// const port = process.env.PORT || 8080;

function main() {
  // My own middleware (CORS middleware)
  // Is invoked every time any HTTP request is received (before anything else happens)
  // Middleware is useful for authentication purposes
  server.use((req, res, next) => {
    // Add additional HTTP Response header
    // Allow anyone to send Fetch API requests to this server
    // You don't want to allow this in all cases
    // Beneficial in development phase
    res.header("Access-Control-Allow-Origin", "*");
    // IMPLEMENT REAL AUTHENTICATION HERE
    let authenticated = true;
    if (authenticated) {
      // Invoking next proceeds with the application
      next();
    }
  });

  // Default Express.js middleware for CORS
  server.use(cors());

  // Default Express.js middleware
  // Everything under ./frontend/public is shown as is on this server
  // I.e. specifies ./frontend/public as directory from which to serve static files
  // Makes it public so anyone can access (e.g. with http://localhost:8080/index.html)
  server.use(express.static("frontend/public"));

  // Default Express.js middleware especially for HTTP POST
  // Reads body of HTTP POST request
  // Parses it and transforms it to JS object
  // Saves object into req.body
  server.use(express.json());

  // TOTEUTA KOHDAT 1., 2., 3. JA 4. SITEN, ETTÄ NE PALAUTTAVAT PROMISEJA !!!
  // KÄYTÄ ASYNC/AWAIT -SYNTAKSIA !!!
  // MUISTA MYÖS TRY/CATCH !!!
  // MAHTAAKO OLLA MAHROLLISTA??!?!?!?!?!?!?!?!??!?!?!?!?!??!?!?!?!??!?!?!?!??!

  // 1. GET all resources from database table
  server.get(`/animal`, (req, res) => {
    connection.getAll((data) => {
      res.send(data);
    });
  });

  // 2. GET single resource from database table
  // :id() injects variable named id into req.params.id
  // It's value is whatever is :id()'s argument
  server.get(`/animal/:id([0-9]+)`, (req, res) => {
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
  server.post(`/guess`, (req, res) => {
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
  server.delete(`/animal/:id([0-9]+)`, (req, res) => {
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
  server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}

main();
