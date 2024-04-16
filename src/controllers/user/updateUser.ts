import { Request, Response } from "express";
import { User } from "../../models/user/User";
import { badRequestError, notFoundError } from "../../utils/error";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { StatusCodes } from "http-status-codes";

export const updateUser = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;

    if (
      req.body.password ||
      req.body.email ||
      req.body.phoneNumber ||
      req.body.profileViews ||
      req.body.postImpressions ||
      req.body.searchAppearances
    ) {
      delete req.body.password,
        req.body.email,
        req.body.phoneNumber,
        req.body.profileViews,
        req.body.postImpressions,
        req.body.searchAppearances;
      throw badRequestError("These fields cannot be edited.");
    }
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

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
