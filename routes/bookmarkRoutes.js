const express = require("express");
const {
  addBookmarkController,
  getBookmarksController,
  removeBookmarkController,
} = require("../controllers/bookmarkControllers");
const { verifyJWT } = require("../middlewares/authMiddleware");

const bookmarkRouter = express.Router();

bookmarkRouter.post("/add", verifyJWT, addBookmarkController);
bookmarkRouter.post("/remove", verifyJWT, removeBookmarkController);
bookmarkRouter.get("/", verifyJWT, getBookmarksController);

module.exports = bookmarkRouter;
