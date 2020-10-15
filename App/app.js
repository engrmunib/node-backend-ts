const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const app = express();

const userRoute = require("./routes/user.route");

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());

app.use(compression());

app.use("/api/user", userRoute);
app.all("*", (req, res, next) => {
  res.status(404).send(
    {
      message:`Can't find ${req.originalUrl} on this server!`
    }
  );
});

module.exports = app;
