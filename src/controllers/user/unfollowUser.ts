import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { User } from "../../models/user/User";
import { CustomRequest } from "../../utils/types";
import { Types } from "mongoose";
import { badRequestError, notFoundError } from "../../utils/error";

export const unfollowUser = async (req: CustomRequest, res: Response) => {
  try {
    let user = req.user;
    let { id } = req.params;
    const follow_id = new Types.ObjectId(id);

    if (user._id === follow_id) {
      throw badRequestError("Users cannot unfollow themselves ;)");
    }

    let userExists = await User.findOne({ _id: user._id });
    let followingExists = await User.findOne({ _id: follow_id });

    if (!followingExists) {
      throw notFoundError("User does not exist");
    }
    if (userExists && followingExists) {
      userExists.following = userExists.following.filter(
        (id) => !id.equals(follow_id)
      );
      await userExists.save();
      followingExists.followers = followingExists.followers.filter(
        (id) => !id.equals(user._id)
      );
      await followingExists.save();
    }
    res
      .status(StatusCodes.CREATED)
      .json(successResponse("User unfollowed successfully"));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
