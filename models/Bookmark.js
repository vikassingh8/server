const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookmark: {
      type: {},
      required: true,
    },
  },
  { timestamps: true }
);
const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
module.exports = Bookmark;
