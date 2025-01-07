import { TTicket } from "./Ticket.interface";
import { Ticket } from "./Ticket.model";

const createTicket = async (newTicket: TTicket) =>
  await Ticket.create(newTicket);

export const TicketService = {
  createTicket,
};
