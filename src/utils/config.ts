import dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT);
export const MONGODB_URL: string = process.env.MONGODB_URL;
export const SECRET_KEY: string = process.env.SECRET_KEY;
export const REFRESH_KEY: string = process.env.REFRESH_KEY;
