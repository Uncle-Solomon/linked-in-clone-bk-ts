import { Types } from "mongoose";

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
}

export interface JWTPayload {
  user: {
    _id: Types.ObjectId;
    email: string;
    country: string;
  };
}
