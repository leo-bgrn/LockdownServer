var createError = require("http-errors");
var express = require("express");
var path = require("path");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var winston = require("./config/winston");
const authMiddleware = require("./auth");

const dotenv = require("dotenv");
dotenv.config();

var app = express();

app.use(bodyParser.json());
app.use(authMiddleware);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("tiny", { stream: winston.stream }));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

var questionsRouter = require("./src/routes/questions.route");
app.use("/questions", questionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
