import { RequestHandler } from "express";
import { UserServices } from "./User.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { AuthServices } from "../auth/Auth.service";
import config from "../../config";
import { TUser } from "./User.interface";

const createUser: RequestHandler = catchAsync(async ({ body }, res) => {
  const { firstName, lastName, gender, email, password, avatar } = body;

  const userData: Partial<TUser> = {
    name: { firstName, lastName },
    gender,
    email,
    password,
    avatar,
  };

  await UserServices.createUser(userData);
  const { accessToken, refreshToken, user } = await AuthServices.loginUser({
    email: body.email,
    password: body.password,
  });

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env !== "development",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "User created successfully!",
    data: { token: accessToken, user },
  });
});

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  const usersWithMeta = await UserServices.getAllUser(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Users are retrieved successfully!",
    data: usersWithMeta,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
};
