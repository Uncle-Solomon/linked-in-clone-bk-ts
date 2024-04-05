import mongoose from "mongoose";

//Database Connection
export const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(error);
  }
};
