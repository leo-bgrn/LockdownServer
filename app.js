const createError = require("http-errors");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const winston = require("./config/winston");
const rateLimit = require("express-rate-limit");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("tiny", { stream: winston.stream }));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const questionsRouter = require("./src/routes/questions.route");
app.use("/questions", questionsRouter);
const suggestionsRouter = require("./src/routes/suggestions.route");
app.use("/suggestions", suggestionsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;

  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
