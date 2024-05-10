const express = require("express");
const {
  signUpController,
  loginController,
} = require("../controllers/authControllers");

const authRouter = express.Router();

authRouter.post("/register", signUpController);
authRouter.post("/login", loginController);

module.exports = authRouter;
