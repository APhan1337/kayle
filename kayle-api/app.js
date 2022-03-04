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

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//#region Initialize Swagger Documentation

let swaggerDefinitionAssember = require("./services/helpers/swaggerDefinitionAssembler");
let swaggerDefinition = swaggerDefinitionAssember.getSwaggerJson();
let options = {
  definition: swaggerDefinition,
  apis: ["./routes/*.js"],
};
app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(options))
);

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
var metadataRouter = require("./routes/metadata");
var walletRouter = require("./routes/wallet");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/metadata", metadataRouter);
app.use("/wallet", walletRouter);

//#endregion

const openAPIspec = require("./swagger.base.json");
app.get("/swagger.base.json", function (req, res) {
  res.json(openAPIspec);
});

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

console.log(`View application at: ${config.host}/documentation`);

module.exports = app;
