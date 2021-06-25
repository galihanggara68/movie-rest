var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var movieRouter = require("./routes/movie");
var authRouter = require("./routes/authentication");

var authenticated = require("./middlewares/authenticate");
var basicauthenticated = require("./middlewares/basicauthenticate");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/movies", authenticated, movieRouter);
app.use("/movies2", basicauthenticated, movieRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message || "error");
});

module.exports = app;
