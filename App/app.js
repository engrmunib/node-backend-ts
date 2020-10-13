const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./user.component/user.route");
const compression = require("compression");
const app = express();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(compression());
app.use("/user", userRoute);
app.all("*", (req, res, next) => {

 
  res.status(200).send(
    "<h1>Hey This is Server, call APIs man. InSource, Lets's Connect</h1>"
  );
  //next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//app.use(globalErrorHandler);
module.exports = app;
