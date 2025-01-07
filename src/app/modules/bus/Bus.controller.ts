import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { BusService } from "./Bus.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createBus: RequestHandler = catchAsync(async (req, res) => {
  const newBus = await BusService.createBus(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Bus created successfully!",
    data: newBus,
  });
});

export const BusController = {
  createBus,
};
