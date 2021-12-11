/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  photo: string;
  password: string;
  confirmPassword: string;
  roles?: any;
}

export interface IUserEntity extends IUser, Document {
  correctPassword: (candidatePassword: string, password: string) => boolean;
}

export interface IUserModel extends Model<IUserEntity> {
  findByUsername: (username: string) => Promise<IUserEntity>;
}
