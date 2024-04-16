import mongoose from "mongoose";
import { ReplyType } from "../../utils/types";

const replySchema = new mongoose.Schema<ReplyType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    textBody: {
      type: String,
      required: true,
    },
    numberofLikes: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "linked-in-clone.replies",
  }
);

export const Reply = mongoose.model("Reply", replySchema);
