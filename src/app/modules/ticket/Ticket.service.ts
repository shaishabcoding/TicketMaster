import { Request } from "express";
import { TTicket } from "./Ticket.interface";
import { Ticket } from "./Ticket.model";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

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
  createTicket,
  deleteTicket,
  updateTicket,
  purchaseTicket,
};
