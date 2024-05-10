const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const generateJWT = async (_id) => {
  try {
    const jwt = await jsonwebtoken.sign({ _id }, config.JWT_SECRET, {
      expiresIn: "15d",
    });
    return jwt;
  } catch (error) {
    console.log(`Error in generateJWT function ${error}`);
  }
};
const bcryptPassword = async (password) => {
  try {
    const bcryptedPassword = await bcrypt.hash(password, 10);

    return bcryptedPassword;
  } catch (error) {
    console.log(`Error in bcryptPassword function ${error}`);
  }
};
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log(`Error in comparePassword function ${error}`);
  }
};
module.exports = { generateJWT, bcryptPassword, comparePassword };
