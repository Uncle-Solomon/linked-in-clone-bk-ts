import mongoose from "mongoose";
import { PostType } from "../../utils/types";

const postSchema = new mongoose.Schema<PostType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    textHead: {
      type: String,
      required: false,
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
    collection: "linked-in-clone.posts",
  }
);

export const Post = mongoose.model("Post", postSchema);
