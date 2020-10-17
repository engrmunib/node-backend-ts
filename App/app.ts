import express from 'express';
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const errorHandler = require('./utils/errorHandler')

const userRoute = require("./routes/user.route");

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());

app.use(errorHandler);

app.use("/api/user", userRoute);
app.all("*", (req, res, next) => {
  res.status(404).send(
    {
      message:`Can't find ${req.originalUrl} on this server!`
    }
  );
});
app.use(errorHandler);

export default app;
