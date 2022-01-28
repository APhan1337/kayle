//#region Import Libraries

var common = require("./common");
var config = common.config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

//#endregion

// initialize express application
var app = express();

//#region Initialize Swagger Documentation
// let swaggerSpecs = swaggerJsdoc(config.swaggerOptions);
// app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//#endregion

//#region View Engine Setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//#endregion

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//#region Register Routes

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var metaDataRouter = require("./routes/metadata");
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/metadata", metaDataRouter);

//#endregion

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
