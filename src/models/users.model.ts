/* eslint-disable @typescript-eslint/ban-types */
import { Schema, model } from 'mongoose';
import { IUserModel, IUserEntity } from '../interfaces/users.interface';
import validator from 'validator';
// tslint:disable-next-line: import-name
import bcrypt from 'bcryptjs';

const usersSchema = new Schema<IUserEntity>({
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
    select: false,
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
  this.confirmPassword = '';
  next();
});

usersSchema.methods.correctPassword = async (candidatePassword: string, password: string) => {
  return await bcrypt.compare(candidatePassword, password);
};

usersSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username });
};

// tslint:disable-next-line: variable-name
export const UsersModel = model<IUserEntity, IUserModel>('users', usersSchema);
