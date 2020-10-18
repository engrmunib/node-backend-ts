import express, {Application} from 'express';
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require('./utils/errorHandler')

const userRoute = require("./routes/user.route");

class App {
  app: Application;
  routes: Routes = new userRoute();
  constructor(){
    this.app = express();
  }
  private config(){
    this.app.use(cors());
    this.app.options("*", cors());
    this.app.use(bodyParser.json());
    this.app.use(errorHandler);
  }
}



app.use("/api/user", userRoute);
app.all("*", (req, res, next) => {
  res.status(404).send(
    {
      message:`Can't find ${req.originalUrl} on this server!`
    }
  );
});

export default app;
