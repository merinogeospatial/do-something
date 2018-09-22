const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const jwt = require('./auth/jwt');
const errorHandler = require('./auth/error-handler');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(jwt());

// Add routes, both API and view
app.use(routes);

app.use(errorHandler);
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dosomething");

mongoose.Promise = Promise;
const dbConnect = mongoose.connection;

dbConnect.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

dbConnect.once("open", function() {
  console.log("Mongoose connection successful.");
});



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
