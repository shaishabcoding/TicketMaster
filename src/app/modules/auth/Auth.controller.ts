import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.service";
import config from "../../config";
import { StatusCodes } from "http-status-codes";

const login: RequestHandler = catchAsync(async (req, res) => {
  const { body } = req;
  const { accessToken, refreshToken, user } = await AuthServices.loginUser(
    body
  );

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env !== "development",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Login successfully!",
    data: { token: accessToken, user },
  });
});

const logout: RequestHandler = catchAsync(async (_req, res) => {
  res.cookie("refreshToken", "", {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: new Date(0), // remove refreshToken
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Logged out successfully",
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Password has changed successfully!",
    data: null,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.refreshToken(req.cookies.refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "New Access create successfully!",
    data: result,
  });
});

const forgetPassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.forgetPassword(req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Password reset link sent successfully!",
    data: null,
  });
});

const resetPassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.forgetPassword(req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Password reset link sent successfully!",
    data: null,
  });
});

export const AuthController = {
  login,
  logout,
  changePassword,
  forgetPassword,
  resetPassword,
  refreshToken,
};
