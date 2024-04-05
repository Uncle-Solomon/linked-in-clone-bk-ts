import mongoose from "mongoose";
import { EducationType } from "../../utils/types";

const educationSchema = new mongoose.Schema<EducationType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolName: {
      type: String,
      required: false,
    },
    degree: {
      type: String,
      required: false,
    },
    fieldOfStudy: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    skills: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "linked-in-clone.education",
  }
);

export const Education = mongoose.model("Education", educationSchema);
