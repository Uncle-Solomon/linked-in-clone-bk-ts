import { Request, Response } from "express";
import { badRequestError, internalServerError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { User } from "../../models/user/User";
import { hashfunction } from "../../helpers/hash";

export const signup = async (req: Request, res: Response) => {
  try {
    let { email, password, otherNames, lastName } = req.body;

    if (!email || !password || !otherNames || !lastName) {
      throw badRequestError("Please enter all required fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw badRequestError("This user already exists");
    }

    const user = new User({ email, password, otherNames, lastName });
    user.password = await hashfunction(user.password);
    const response = await user.save();

    if (!response) {
      throw internalServerError("User signup was unsuccessful");
    }

    res
      .status(StatusCodes.CREATED)
      .json(successResponse("User created successfully"));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
