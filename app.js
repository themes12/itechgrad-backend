require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("connect to mongodb successfully"))
    .catch((error) => console.log(error));

var courseRouter = require("./routes/course");
var settingRouter = require("./routes/setting");
var programRouter = require("./routes/program");
var planRouter = require("./routes/plan");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/course", courseRouter);
app.use("/setting", settingRouter);
app.use("/program", programRouter);
app.use("/plan", planRouter);

module.exports = app;
