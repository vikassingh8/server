const Bookmark = require("../models/Bookmark");
const addBookmarkController = async (req, res) => {
  try {
    const { _id } = req.userInfo;
    const { bookmark } = req.body;
    let bookmarked = new Bookmark({ userId: _id, bookmark });
    bookmarked = await bookmarked.save();
    if (bookmarked) {
      return res.status(201).json({
        status: true,
        message: "Bookmarked successfully.",
        bookmarked,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Bookmarked failed.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: true,
      message: `Error in addBookmarkController API : ${error}`,
      error,
    });
  }
};
const removeBookmarkController = async (req, res) => {
  try {
    const { _id } = req.userInfo;
    const { bookmarkId } = req.body;

    const removed = await Bookmark.findOneAndDelete({
      userId: _id,
      "bookmark.id": bookmarkId,
    });
    if (removed) {
      let bookmarked = await Bookmark.find({ userId: _id });
      return res.status(201).json({
        status: true,
        message: "Bookmark removed successfully.",
        data: bookmarked,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: true,
      message: `Error in removeBookmarkController API : ${error}`,
      error,
    });
  }
};
const getBookmarksController = async (req, res) => {
  try {
    const { _id } = req.userInfo;
    const bookemarks = await Bookmark.find({ userId: _id });
    if (bookemarks.length) {
      return res.status(201).json({
        status: true,
        message: "Bookmarks found Successfully.",
        data: bookemarks,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "No Bookmarks were found.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: true,
      message: `Error in getBookmarksController API : ${error}`,
      error,
    });
  }
};

module.exports = {
  addBookmarkController,
  getBookmarksController,
  removeBookmarkController,
};
