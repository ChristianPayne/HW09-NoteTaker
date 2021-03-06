var express = require("express");

// Create an "express" server
var app = express();

// Sets a port.
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("./public/assets"));

// Routes
require("./server/routes/apiRoutes")(app);
require("./server/routes/htmlRoutes")(app);

// Start listening
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
