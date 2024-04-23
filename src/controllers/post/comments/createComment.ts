import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { internalServerError } from "../../../utils/error";
import { Comment } from "../../../models/post/Comment";
import { CustomRequest } from "../../../utils/types";

export const createComment = async (req: CustomRequest, res: Response) => {
  try {
    let user = req.user._id;
    let { post, textBody, imgUrl } = req.body;
    const comment = new Comment({ user, post, textBody, imgUrl });
    const response = await comment.save();
    if (!response) {
      throw internalServerError("Comment could not be created");
    }
    res
      .status(StatusCodes.CREATED)
      .json(successResponse("Comment created successfully", comment));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
