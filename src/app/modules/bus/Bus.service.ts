import { Request } from "express";
import { TBus } from "./Bus.interface";
import { Bus } from "./Bus.model";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder, { QueryParams } from "../../utils/QueryBuilder";
import { busSearchableFields } from "./Bus.constant";
import { Ticket } from "../ticket/Ticket.model";
import { startSession } from "mongoose";

const getAllBuses = async (query: QueryParams) => {
  const busQuery = new QueryBuilder(Bus.find(), query)
    .search(busSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await busQuery.countTotal();
  const buses = await busQuery.modelQuery.exec();

  return {
    meta,
    buses,
  };
};

const createBus = async (newBus: TBus) => await Bus.create(newBus);

const updateBus = async ({ params, body }: Request) => {
  const updatedBus = await Bus.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBus) throw new AppError(StatusCodes.NOT_FOUND, "Bus not found");

  return updatedBus;
};

/** deleteBus should delete ticket.bus ref */
const deleteBus = async (id: string) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const deletedBus = await Bus.findByIdAndDelete(id, { session });

    if (!deletedBus) {
      throw new AppError(StatusCodes.NOT_FOUND, "Bus not found");
    }

    await Ticket.deleteMany({ bus: id }, { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const BusService = {
  createBus,
  updateBus,
  deleteBus,
  getAllBuses,
};
