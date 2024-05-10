const dotenv = require("dotenv");

dotenv.config();

const config = {
  PORT: String(process.env.PORT),
  MONGO_URI: String(process.env.MONGO_URI),
  JWT_SECRET: String(process.env.JWT_SECRET),
};
module.exports = config;
