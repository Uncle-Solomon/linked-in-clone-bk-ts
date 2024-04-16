import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { notFoundError } from "../../../utils/error";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { Post } from "../../../models/post/Post";

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    if (!post) throw notFoundError("Post does not exist");
    res
      .status(StatusCodes.OK)
      .json(successResponse("Post found successfully", post));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
