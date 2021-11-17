// Importera
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');

const cors = require('cors');

// Läs in Schemana
//var Student = require("./models/student.js");


// Skapa instans av express
const app = express();

// Port
const port = process.env.PORT || 3000;

require("./routes/webservice")(app);

// Skapa statisk sökväg
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
//app.use(https);

// Starta servern
app.listen(port, function() {
    console.log("Server running on port " + port);
  });