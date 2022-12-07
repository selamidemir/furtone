const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const dotenv = require("dotenv");

const pagesRouter = require("./routes/pages");
const usersRouter = require("./routes/users");

const app = express();

dotenv.config();

app.locals.user = null;
app.locals.userIN = null;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.APP_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.APP_MONGODB_FULL_URL,
      dbName: process.env.APP_MONGODB_DB_NAME,
    }),
  })
);

app.use(function (req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user;
    res.locals.userIN = req.session.user._id;
  } else {
    res.locals.user = null;
    res.locals.userIN = null;
  }
  next();
});

// app.use("*", (req, res, next) => {
//   console.log("çalıştı bir şeyler")
//   global.userIN = req.session.user;
//   next();
// });

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.APP_MONGODB_FULL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.APP_MONGODB_DB_NAME,
  })
  .catch((err) => {
    throw err;
  });

app.use("/", pagesRouter);
app.use("/users", usersRouter);

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
