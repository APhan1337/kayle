// import configs
var common = require("./common");
var config = common.config();

// import dependencies
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var moviesRouter = require("./routes/movies");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

// auth0 setup
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.auth0.jwksUri,
  }),
  audience: config.auth0.audience,
  issuer: config.auth0.issuer,
  algorithms: ["RS256"],
});
app.use(jwtCheck);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
