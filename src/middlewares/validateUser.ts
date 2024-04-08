import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { REFRESH_KEY, SECRET_KEY } from "../utils/config";
import { JWTPayload } from "../utils/types";
import { StatusCodes } from "http-status-codes";
import { unAuthorizedError } from "../utils/error";

export const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.accesstoken;
    const refreshToken = req.headers.refreshtoken;

    // Flag to track authorization status
    let authorized = false;

    if (accessToken) {
      const payload: JWTPayload = verifyJwt(accessToken, SECRET_KEY);
      if (payload) {
        authorized = true;
        return next();
      }
    }

    if (refreshToken && !authorized) {
      const payload: JWTPayload = verifyJwt(refreshToken, REFRESH_KEY);
      if (payload) {
        authorized = true;
        return next();
      }
    }

    if (!authorized) {
      throw unAuthorizedError(
        "Authorization failed: You must be a logged in user to access this route"
      );
    }
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
