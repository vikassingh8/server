const express = require("express");
const cors = require("cors");
const colors = require("colors");
const config = require("./config/config");
const authRouter = require("./routes/authRoutes");
const connectDB = require("./config/db");
const bookmarkRouter = require("./routes/bookmarkRoutes");

const app = express();
const PORT = config.PORT || 3002;

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send({
    status: true,
    message: "This domains api is mangaed by Vikas singh",
  });
});
// other routes
app.use("/api/auth", authRouter);
app.use("/api/bookmark", bookmarkRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`.bgGreen);
  });
});
