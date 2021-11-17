import { Schema, model } from 'mongoose';
import { IMeal } from '../interfaces/meal.interface';

const schema = new Schema<IMeal>({
  name: { type: String, required: [true, 'Meal must have a name'], unique: true },
  description: { type: String, maxlength: 50 },
  icon: String,
  photo: String,
  address: String,
  isOpen: Boolean,
});

// tslint:disable-next-line: variable-name
export const MealsModel = model<IMeal>('Meal', schema);