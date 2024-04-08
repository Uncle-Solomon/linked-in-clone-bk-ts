import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user/User";
import { notFoundError } from "../../utils/error";
import { errorResponse, successResponse } from "../../utils/customResponse";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) throw notFoundError("User does not exist");
    res
      .status(StatusCodes.OK)
      .json(successResponse("User found successfully", user));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
