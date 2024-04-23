import { Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
// import { REFRESH_KEY, SECRET_KEY } from "../utils/config";

import { SECRET_KEY } from "../utils/config";
import { CustomRequest, JWTPayload } from "../utils/types";
import { StatusCodes } from "http-status-codes";
import { unAuthorizedError } from "../utils/error";

export const validateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader: string =
      req.headers["authorization"] || req.headers.authorization;
    if (!bearerHeader || typeof bearerHeader !== "string") {
      throw unAuthorizedError("Authorization header is missing");
    }

    const token = bearerHeader.split(" ")[1];
    // const refreshToken = req.headers.refreshtoken;

    // Flag to track authorization status
    let authorized = false;

    if (token) {
      const payload: JWTPayload = verifyJwt(token, SECRET_KEY);
      if (payload) {
        authorized = true;
        req.user = payload.user;
        return next();
      }
    }

    // if (refreshToken && !authorized) {
    //   const payload: JWTPayload = verifyJwt(refreshToken, REFRESH_KEY);
    //   if (payload) {
    //     authorized = true;
    //     return next();
    //   }
    // }

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
