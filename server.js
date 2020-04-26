// Dependencies
var express = require("express");

// var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

//routes
require("./routes/apiroute")(app);
require("./routes/htmlroute")(app);

// Sets up Express


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });