import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../../utils/customResponse";
import { internalServerError } from "../../../utils/error";
import { Reply } from "../../../models/post/Reply";

export const createReply = async (req: Request, res: Response) => {
  try {
    let { user, comment, textBody, imgUrl } = req.body;
    const reply = new Reply({ user, comment, textBody, imgUrl });
    const response = await reply.save();
    if (!response) {
      throw internalServerError("Reply could not be created");
    }
    res
      .status(StatusCodes.CREATED)
      .json(successResponse("Reply created successfully", reply));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
