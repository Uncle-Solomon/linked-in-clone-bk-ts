import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { Reply } from "../../../models/post/Reply";

export const getAllReplies = async (req: Request, res: Response) => {
  try {
    const replies = await Reply.find({});
    res
      .status(StatusCodes.OK)
      .json(successResponse("Replies found successfully", replies));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
