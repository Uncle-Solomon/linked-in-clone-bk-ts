import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { User } from "../../models/user/User";
import { CustomRequest } from "../../utils/types";
import { Types } from "mongoose";
import { badRequestError, notFoundError } from "../../utils/error";

export const followUser = async (req: CustomRequest, res: Response) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const follow_id = new Types.ObjectId(id);

    if (user._id === id) {
      throw badRequestError("Users cannot follow themselves ;)");
    }

    const userExists = await User.findOne({ _id: user._id });
    const followingExists = await User.findOne({ _id: follow_id });

    if (!followingExists) {
      throw notFoundError("User to follow does not exist");
    }

    if (userExists.following.includes(follow_id)) {
      throw badRequestError("You are already following this user");
    }

    if (userExists && followingExists) {
      userExists.following.push(follow_id);
      await userExists.save();
      followingExists.followers.push(user._id);
      await followingExists.save();
    }

    res
      .status(StatusCodes.CREATED)
      .json(successResponse("User followed successfully"));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
