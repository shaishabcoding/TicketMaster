import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { BusService } from "./Bus.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllBuses: RequestHandler = catchAsync(async ({ query }, res) => {
  const busesWithMeta = await BusService.getAllBuses(query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Buses are retrieved successfully!",
    data: busesWithMeta,
  });
});

const createBus: RequestHandler = catchAsync(async ({ body }, res) => {
  const newBus = await BusService.createBus(body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Bus created successfully!",
    data: newBus,
  });
});

const updateBus: RequestHandler = catchAsync(async (req, res) => {
  const updatedBus = await BusService.updateBus(req);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bus updated successfully!",
    data: updatedBus,
  });
});

const deleteBus: RequestHandler = catchAsync(async ({ params }, res) => {
  await BusService.deleteBus(params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bus deleted successfully!",
  });
});

export const BusController = {
  createBus,
  updateBus,
  deleteBus,
  getAllBuses,
};
