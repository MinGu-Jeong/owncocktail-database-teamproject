var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
  // con.query('USE `MyCocktail`', function(err, result){
  //   if(err) throw err;
  //   console.log('use MyCocktail')
  // })
  // con.query('SELECT * FROM `recipe`', function(err, result){
  //   if (err) throw err;
  //   console.log(result)
  // })
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static())
app.use(express.static(path.join(__dirname, "public")));

const usersRouter = require("./routes/users");
const toolsRouter = require("./routes/tools");
const syrupRouter = require("./routes/syrup");
const snackRouter = require("./routes/snack");
const recipeRouter = require("./routes/recipe");
const myboardRouter = require("./routes/my_board");
const myboardcommentRouter = require("./routes/my_board_comment");
const liquorRouter = require("./routes/liquor");
const garnishRouter = require("./routes/garnish");
const frequencyRouter = require("./routes/frequency");
const defaultboardRouter = require("./routes/default_board");
const defaultboardcommentRouter = require("./routes/default_board_comment");
const beveridgeRouter = require("./routes/beveridge");

app.use("/users", usersRouter);
app.use("/tools", toolsRouter);
app.use("/syrup", syrupRouter);
app.use("/snack", snackRouter);
app.use("/recipe", recipeRouter);
app.use("/my_board", myboardRouter);
app.use("/my_board_comment", myboardcommentRouter);
app.use("/liquor", liquorRouter);
app.use("/garnish", garnishRouter);
app.use("/frequency", frequencyRouter);
app.use("/default_board", defaultboardRouter);
app.use("/default_board_comment", defaultboardcommentRouter);
app.use("/beveridge", beveridgeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.get("/", function (req, res) {
  res.render("index.html");
  //res.sendFile(__dirname + '/views/index.html')
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
