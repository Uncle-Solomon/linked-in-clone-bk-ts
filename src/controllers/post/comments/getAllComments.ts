import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { Comment } from "../../../models/post/Comment";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({});
    res
      .status(StatusCodes.OK)
      .json(successResponse("Comments found successfully", comments));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
