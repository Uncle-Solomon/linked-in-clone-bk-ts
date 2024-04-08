import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { Post } from "../../../models/post/Post";
import { internalServerError } from "../../../utils/error";

export const createPost = async (req: Request, res: Response) => {
  try {
    let { user, textHead, textBody, imgUrl } = req.body;
    const post = new Post({ user, textHead, textBody, imgUrl });
    const response = await post.save();
    if (!response) {
      throw internalServerError("Post could not be created");
    }
    res
      .status(StatusCodes.CREATED)
      .json(successResponse("Post created successfully", post));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
