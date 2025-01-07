import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { TicketService } from "./Ticket.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createTicket: RequestHandler = catchAsync(async ({ body }, res) => {
  body.bus = body.busId;

  const newTicket = await TicketService.createTicket(body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Ticket created successfully!",
    data: newTicket,
  });
});

export const TicketController = {
  createTicket,
};
