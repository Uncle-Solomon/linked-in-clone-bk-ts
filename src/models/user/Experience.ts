import mongoose from "mongoose";
import { ExperienceType } from "../../utils/types";

const experienceSchema = new mongoose.Schema<ExperienceType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    locationType: {
      type: String,
      required: false,
    },
    employmentType: {
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
    },
  },
  {
    timestamps: true,
    collection: "linked-in-clone.experience",
  }
);

export const Experience = mongoose.model("Experience", experienceSchema);
