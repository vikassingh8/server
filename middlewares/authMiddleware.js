const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");
const verifyJWT = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        status: false,
        message: "Unauthorized Access, No token were found.",
      });
    }
    if (!token.startsWith("Bearer ")) {
      return res.status(401).send({
        status: false,
        message:
          "Unauthenticated Access, Wrond format giver please use 'Bearer ' as a prefix.",
      });
    }
    token = token.split(" ")[1];
    const decoded = await jsonwebtoken.verify(token, config.JWT_SECRET);
    if (!decoded) {
      return res.status(404).send({
        status: false,
        message: "Wrong Decoded info.",
      });
    }
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found.",
      });
    }
    req.userInfo = user;
    next();
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in verifyJWT middleware : ${error}`,
      error,
    });
  }
};
module.exports = { verifyJWT };
