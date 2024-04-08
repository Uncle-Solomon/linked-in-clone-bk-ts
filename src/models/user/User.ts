import mongoose from "mongoose";
import validator from "validator";
import { UserType } from "../../utils/types";

export const userSchema = new mongoose.Schema<UserType>(
  {
    otherNames: {
      type: String,
      required: true,
    },
    lastName: {
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
      required: false,
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
      required: false,
    },
    profileViews: {
      type: Number,
      required: false,
      default: 0,
    },
    postImpressions: {
      type: Number,
      required: false,
      default: 0,
    },
    searchAppearances: {
      type: Number,
      required: false,
      default: 0,
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
  },
  {
    timestamps: true,
    collection: "linked-in-clone.users",
  }
);

export const User = mongoose.model("User", userSchema);
