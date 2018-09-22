const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const router = express.Router();
const sess = {
  secret: 'doesnt0matter',
  cookie: {
    maxAge: 500000
  },
  resave: true,
  saveUninitialized: true
}
var User = require("./models/user");

app.use(session(sess));

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/test", function(req, res) {
  console.log("works!");
})
// Add routes, both API and view
// app.use(routes);

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

//test route

app.get("/", function(req, res) {
  console.log(req.session);
  User.find({}, function(error, data) {
    var hbsObject = {
      User: data
    };
    res.redirect("/");
    console.log(hbsObject);
  });
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
