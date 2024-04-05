import { Request, Response } from "express";
import { badRequestError, notFoundError } from "../../utils/error";
import { User } from "../../models/user/User";
import { hashfunction } from "../../helpers/hash";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    let { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      throw badRequestError("Please enter all required fields");
    }
    if (password != confirmPassword) {
      throw badRequestError("The passwords do not match");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw notFoundError("User does not exist");
    }

    user.password = await hashfunction(password);

    res
      .status(StatusCodes.OK)
      .json(successResponse("Password changed successfully"));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
