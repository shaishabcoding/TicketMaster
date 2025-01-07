import { TBus } from "./Bus.interface";
import { Bus } from "./Bus.model";

const createBus = async (newBus: TBus) => await Bus.create(newBus);

export const BusService = {
  createBus,
};
