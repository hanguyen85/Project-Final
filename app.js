var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var flash = require("connect-flash");
var MongoDBStore = require("connect-mongodb-session")(session);

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var manageRouter = require("./routes/manage");
var reservationRouter = require("./routes/reservation");
const port = process.env.PORT || 4000;

var app = express();

var store = new MongoDBStore({
  uri: "mongodb+srv://ha:test123@cluster0.zyzyjlr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
  collection: "mySession",
});

const timeout = 60000;
app.use(
  session({
    secret: "my-secret",
    resave: false,
    cookie: { maxAge: timeout },
    saveUninitialized: true,
    store: store,
  })
);

app.use(flash());

//1. congfig mongoose library
var mongoose = require("mongoose");
// set mongodb connection
var database =
  "mongodb+srv://ha:test123@cluster0.zyzyjlr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(database)
  .then(() => console.log("Connection successfull"))
  .catch((err) => console.log("Error: " + err));

//2. congfig body-parse library (get data from client-side)
var bodyParser = require("body-parser");
const {
  verifyToken,
  checkUser,
  checkAdmin,
} = require("./middlewares/authMiddleware");
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Sử dụng router
app.use("/", checkUser, indexRouter);
app.use("/user", userRouter);
app.use("/manage", checkAdmin, manageRouter);
app.use("/reservation", reservationRouter);

// catch 404 and forward to error handler
app.all("*", function (req, res, next) {
  res.render("404", { layout: "empty_layout" });
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
