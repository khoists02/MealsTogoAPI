import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/users.interface';
import validator from 'validator';
// tslint:disable-next-line: import-name
import bcrypt from 'bcryptjs';

const usersSchema = new Schema<IUser>({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Email is invalid'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator(el: string) {
        return el === this.password;
      },
      message: 'The Confirm password are not the same',
    },
  },
});

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

// tslint:disable-next-line: variable-name
export const UsersModel = model<IUser>('users', usersSchema);
