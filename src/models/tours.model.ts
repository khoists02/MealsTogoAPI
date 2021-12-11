import { Schema, model } from "mongoose";
import { ITourModel } from "../interfaces/tours.interface";

const schema = new Schema<ITourModel>({
  name: { type: String, required: [true, "Tours must have a name"], unique: true },
  price: String,
});

// tslint:disable-next-line: variable-name
export const ToursModel = model<ITourModel>("Tour", schema);
