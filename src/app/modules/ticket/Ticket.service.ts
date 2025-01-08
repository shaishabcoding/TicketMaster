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

export const TicketService = {
  createTicket,
  deleteTicket,
};
