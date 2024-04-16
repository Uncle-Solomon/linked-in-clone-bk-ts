import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { notFoundError } from "../../../utils/error";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { Reply } from "../../../models/post/Reply";

export const getReplyByCommentId = async (req: Request, res: Response) => {
  try {
    const { comment_id } = req.params;
    const reply = await Reply.findOne({ comment: comment_id });
    if (!reply) throw notFoundError("Reply does not exist");
    res
      .status(StatusCodes.OK)
      .json(successResponse("Reply found successfully", reply));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
