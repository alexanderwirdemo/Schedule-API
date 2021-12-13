// Importera
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const DATABASE = "Schedule";
const DB_USER = "lidiya"; // Database connection user
const DB_PASSWORD = "dvpMXNSQWFAp2UGb"; // Database connection password
const DATABASE_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@ltu-rest-ws.mwzyn.mongodb.net/test?authSource=admin&replicaSet=atlas-i5ooth-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

// Läs in Schemana
//var Student = require("./models/student.js");

// Skapa instans av express
const app = express();

// Port
const port = process.env.PORT || 3000;

// Skapa statisk sökväg

app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  next();
});
//app.use(https);
/**
 * Middleware
 */
/*
 app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  next();
});*/

// Create a MongoDB connection pool and start the application
// after the database connection is ready
MongoClient.connect(DATABASE_URL, (err, db) => {
  if (err) {
    console.error(`Failed to connect to the database. ${err.stack}`);
  }
  app.locals.db = db.db(DATABASE); // Connect to database "Schedule"

require("./routes/webservice")(app);
require("./routes/canvas")(app);
require("./routes/auth")(app);
  // Starta servern
  app.listen(port, function () {
    console.log("Server running on port " + port);
  });
});
