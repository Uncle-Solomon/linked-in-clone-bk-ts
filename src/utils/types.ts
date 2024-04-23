import { Request } from "express";
import { Types } from "mongoose";

export interface CustomRequest extends Request {
  user?: any;
}

export interface EducationType {
  user: Types.ObjectId;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
  skills: Array<string>;
}

export interface ExperienceType {
  user: Types.ObjectId;
  companyName: string;
  role: string;
  location: string;
  locationType: string;
  employmentType: string;
  startDate: Date;
  endDate: Date;
  skills: Array<string>;
}

export interface UserType {
  lastName: string;
  otherNames: string;
  gender: string;
  email: {
    validate: {
      validator: (arg0: string) => boolean;
      message: string;
    };
  };
  phoneNumber: {
    validate: {
      validator: (arg0: string) => boolean;
      message: string;
    };
  };
  password: string;
  profileViews: number;
  postImpressions: number;
  searchAppearances: number;
  headline: string;
  currentPosition: string;
  about: string;
  industry: string;
  country: string;
  city: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}

export interface PostType {
  user: Types.ObjectId;
  textHead: string;
  textBody: string;
  imgUrl: string;
  numberofLikes: number;
}

export interface CommentType {
  user: Types.ObjectId;
  post: Types.ObjectId;
  textBody: string;
  imgUrl: string;
  numberofLikes: number;
}

export interface ReplyType {
  user: Types.ObjectId;
  comment: Types.ObjectId;
  textBody: string;
  numberofLikes: number;
}

export interface JWTPayload {
  user: {
    _id: Types.ObjectId;
    email: string;
    country: string;
  };
}
