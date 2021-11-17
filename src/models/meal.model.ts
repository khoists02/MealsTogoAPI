import { Schema, model } from 'mongoose';
import { IMeal } from '../interfaces/meal.interface';

const schema = new Schema<IMeal>({
  name: { type: String, required: [true, 'Meal must have a name'], unique: true },
  description: { type: String, maxlength: 50 },
  icon: String,
  photos: { types: [String], default: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'] },
  address: String,
  isOpen: Boolean,
  rate: { type: Number, max: 5, min: 0, default: 5 },
});

// tslint:disable-next-line: variable-name
export const MealsModel = model<IMeal>('Meal', schema);