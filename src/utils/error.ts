import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
  public success = false;
  public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  constructor(message: string) {
    super(message);
  }

  badRequest = () => {
    this.statusCode = StatusCodes.BAD_REQUEST;
    return this;
  };

  notFound = () => {
    this.statusCode = StatusCodes.NOT_FOUND;
    return this;
  };

  serverFailure = () => {
    return this;
  };

  unAuthorized = () => {
    this.statusCode = StatusCodes.UNAUTHORIZED;
    return this;
  };
}

const createCustomError = (msg: string) => {
  return new CustomError(msg);
};

export const badRequestError = (msg: string) =>
  createCustomError(msg).badRequest();

export const internalServerError = (msg: string) =>
  createCustomError(msg).serverFailure();

export const unAuthorizedError = (msg: string) =>
  createCustomError(msg).unAuthorized();

export const notFoundError = (msg: string) => createCustomError(msg).notFound();
