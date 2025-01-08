import { Request } from "express";
import { TTicket } from "./Ticket.interface";
import { Ticket } from "./Ticket.model";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder, { QueryParams } from "../../utils/QueryBuilder";
import { Types } from "mongoose";
import { ticketExcludeFields } from "./Ticket.constant";
import { busSearchableFields } from "../bus/Bus.constant";

const getAllTicket = async (query: QueryParams) => {
  const searchRegex = new RegExp(query.searchTerm!, "i");
  const timeSlotFilterWithBus: any = (() => {
    const filters: any = {};

    if (query.startTime && query.endTime) {
      filters.timeSlot = {
        $gte: new Date(query.startTime as string),
        $lte: new Date(query.endTime as string),
      };
    } else if (query.timeSlot) {
      const timeSlot = new Date(query.timeSlot as string);
      if (isNaN(timeSlot.getTime())) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Invalid timeSlot format. Use a valid ISO date string."
        );
      }
      filters.timeSlot = timeSlot;
    }

    if (query.busId) filters.bus = new Types.ObjectId(query.busId as string);

    return filters;
  })();

  const ticketQuery = new QueryBuilder(
    Ticket.find({ status: "available", ...timeSlotFilterWithBus }),
    query
  )
    .filter(ticketExcludeFields)
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "bus",
      match: {
        $or: busSearchableFields.map((field) => ({
          [field]: { $regex: searchRegex },
        })),
      },
    });

  const [meta, tickets] = await Promise.all([
    ticketQuery.countTotal(),
    ticketQuery.modelQuery.exec(),
  ]);

  return {
    meta,
    tickets: tickets.filter((ticket) => ticket.bus),
  };
};

const createTicket = async (newTicket: TTicket) =>
  await Ticket.create(newTicket);

const updateTicket = async ({ params, body }: Request) => {
  const updatedTicket = await Ticket.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTicket)
    throw new AppError(StatusCodes.NOT_FOUND, "Ticket not found");

  return updatedTicket;
};

const deleteTicket = async (id: string) => {
  const deletedTicket = await Ticket.findByIdAndDelete(id);

  if (!deletedTicket)
    throw new AppError(StatusCodes.NOT_FOUND, "Ticket not found");
};

const purchaseTicket = async ({ body: { ticketId }, user }: Request) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket)
    throw new AppError(StatusCodes.NOT_FOUND, "Ticket does not found");

  if (ticket.status === "booked")
    throw new AppError(StatusCodes.BAD_REQUEST, "Ticket already booked");

  ticket.status = "booked";
  ticket.user = user._id;
  await ticket.save();
};

export const TicketService = {
  getAllTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  purchaseTicket,
};
