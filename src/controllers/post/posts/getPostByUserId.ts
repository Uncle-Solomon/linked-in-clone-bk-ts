import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { notFoundError } from "../../../utils/error";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { Post } from "../../../models/post/Post";
import { CustomRequest } from "../../../utils/types";

export const getPostByUserId = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ user: id });
    if (!post) throw notFoundError("Posts do not exist");
    res
      .status(StatusCodes.OK)
      .json(successResponse("Posts found successfully", post));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
