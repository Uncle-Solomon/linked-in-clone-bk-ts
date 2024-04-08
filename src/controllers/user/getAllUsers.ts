import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user/User";
import { errorResponse, successResponse } from "../../utils/customResponse";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res
      .status(StatusCodes.OK)
      .json(successResponse("Users found successfully", users));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
