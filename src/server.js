const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbconnect");
const passport = require("passport");

const app = express();

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
const index = require("./api/routes/index");
const adminRoutes = require("./api/routes/adminRoutes/adminAuthRoutes");
// const profile = require('./api/routes/profile');
// const user = require('./api/routes/user');

const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);
  next();
};

app.use(logRequestStart);

//connect database
connectDB();

// passport-Setup
app.use(passport.initialize());
app.use((req, res, next) => {
  //   //CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS,DELETE");
  res.header(
    "Access-Control-Expose-Headers",
    "X-Api-Version, X-Request-Id, X-Response-Time"
  );
  next();
});

require("./config/passport")(passport);

app.use("/", index);
app.use("/api/admin", adminRoutes);
// app.use('/api/user', user);

module.exports = app;
