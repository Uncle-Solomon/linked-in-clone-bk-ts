import mongoose from "mongoose";
import validator from "validator";
import { UserType } from "../../utils/types";

export const userSchema = new mongoose.Schema<UserType>(
  {
    othernames: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide a valid phone number",
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profileViews: {
      type: Number,
      required: false,
    },
    postImpressions: {
      type: Number,
      required: false,
    },
    searchAppearances: {
      type: Number,
      required: false,
    },
    headline: {
      type: String,
      required: false,
    },
    currentPosition: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    industry: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    education: {
      type: [Object],
      required: false,
      default: [],
    },
    experience: {
      type: [Object],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "linked-in-clone.users",
  }
);

export const User = mongoose.model("User", userSchema);
