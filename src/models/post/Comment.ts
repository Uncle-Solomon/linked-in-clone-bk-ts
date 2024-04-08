import mongoose from "mongoose";
import { CommentType } from "../../utils/types";

const commentSchema = new mongoose.Schema<CommentType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    textBody: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    numberofLikes: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "linked-in-clone.comments",
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
