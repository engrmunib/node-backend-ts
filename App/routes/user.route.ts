import userController from "../controllers/user.controller";
import express, { Router } from "express";

export default class userRoutes {
  router: Router;
  controller: userController;
  constructor() {
    this.router = express.Router();
    this.controller = new userController();
    this.routes();
  }

  routes() {
    this.router.post("/signup", this.controller.signup);
    this.router.post("/login", this.controller.login);
    this.router
      .route("/")
      .get(this.controller.getAllUsers)
      .patch(this.controller.updateUser)
      .delete(this.controller.deleteUser);
  }
}