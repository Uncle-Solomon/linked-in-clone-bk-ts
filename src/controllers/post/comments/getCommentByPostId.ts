import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { notFoundError } from "../../../utils/error";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { Comment } from "../../../models/post/Comment";

export const getCommentByPostId = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    const comment = await Comment.find({ post: post_id });
    if (!comment) throw notFoundError("Comment does not exist");
    res
      .status(StatusCodes.OK)
      .json(successResponse("Comment found successfully", comment));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
