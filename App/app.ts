import express, { Application, Request, Response } from 'express';
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const userRoute = require("./routes/user.route");

class App {
  app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.routing();
  }

  private config() {
    this.app.use(cors());
    this.app.options("*", cors());
    this.app.use(bodyParser.json());
    this.app.use(errorHandler);
  }
  
  private routing() {
    this.app.use("/api/user", userRoute);
    this.app.all("*", (req: Request, res: Response) => {
      res.status(404).send({
        message: `Can't find ${req.originalUrl} on this server!`,
      });
    });
  }
}

export default new App().app;