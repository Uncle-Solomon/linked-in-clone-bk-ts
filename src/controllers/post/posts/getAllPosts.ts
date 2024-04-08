import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { Post } from "../../../models/post/Post";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({});
    res
      .status(StatusCodes.OK)
      .json(successResponse("Posts found successfully", posts));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
