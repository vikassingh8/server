const {
  generateJWT,
  bcryptPassword,
  comparePassword,
} = require("../helpers/helpers");
const User = require("../models/User");

const signUpController = async (req, res) => {
  try {
    const { email, password, cPassword } = req.body;
    if (!email) {
      return res.status(400).send({
        status: false,
        message: "Email can't be empty.",
      });
    } else if (!email.includes("@gmail.com")) {
      return res.status(400).send({
        status: false,
        message: "Invalid email.",
      });
    } else if (!password) {
      return res.status(400).send({
        status: false,
        message: "Password can't be empty.",
      });
    } else if (password.length < 6) {
      return res.status(400).send({
        status: false,
        message: "password sould not be less than 6 char.",
      });
    } else if (password != cPassword) {
      return res.status(400).send({
        status: false,
        message: "password and confirm password didn't match.",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(200).send({
        status: false,
        message: "User already exist, please use different email.",
      });
    }
    req.body.password = await bcryptPassword(password);
    const user = new User(req.body);
    const newUser = await user.save();
    if (newUser) {
      const token = await generateJWT(newUser._id);
      return res.status(200).send({
        status: true,
        message: "Registration Successfully.",
        data: newUser,
        token,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Registration Failed.",
        data: newUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: true,
      message: `Error in signUpController API : ${error}`,
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        status: false,
        message: "Email can't be empty.",
      });
    } else if (!email.includes("@gmail.com")) {
      return res.status(400).send({
        status: false,
        message: "Invalid email.",
      });
    } else if (!password) {
      return res.status(400).send({
        status: false,
        message: "Password can't be empty.",
      });
    } else if (password.length < 6) {
      return res.status(400).send({
        status: false,
        message: "password sould not be less than 6 char.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found.",
      });
    }
    const isValidPassowrd = await comparePassword(password, user.password);
    if (!isValidPassowrd) {
      return res.status(400).send({
        status: false,
        message: "Invalid password.",
      });
    }
    if (user) {
      const token = await generateJWT(user._id);
      return res.status(200).send({
        status: true,
        message: "LoggedIn Successfully.",
        data: user,
        token,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Login Failed.",
        data: newUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: true,
      message: `Error in loginController API : ${error}`,
      error,
    });
  }
};
module.exports = { signUpController, loginController };
