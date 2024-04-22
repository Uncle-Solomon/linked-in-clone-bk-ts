import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { StatusCodes } from "http-status-codes";
import { badRequestError, notFoundError } from "../../utils/error";
import { User } from "../../models/user/User";
// import { REFRESH_KEY, SECRET_KEY } from "../../utils/config";

import { createJwt } from "../../utils/jwt";
import { JWTPayload } from "../../utils/types";
import { SECRET_KEY } from "../../utils/config";

export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      throw badRequestError("Please enter all required fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw notFoundError("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw badRequestError("Password entered is incorrect");
    }
    let _id = user._id;
    let country = user.country;

    let payload: JWTPayload = { user: { _id, email, country } };
    let token: string = createJwt(payload, SECRET_KEY, 3600);
    // let refreshToken: string = createJwt(payload, REFRESH_KEY, 86400);

    res
      .status(StatusCodes.OK)
      .json(successResponse("User login successful", { token }));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
