const express = require("express");
const userController = require("./user.controller");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router;