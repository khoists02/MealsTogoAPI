import { Document, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  photo: string;
  password: string;
  confirmPassword: string;
}

export interface IUserEntity extends IUser, Document {
  correctPassword: (candidatePassword: string, password: string) => boolean;
}

export interface IUserModel extends Model<IUserEntity> {
  findByUsername: (username: string) => Promise<IUserEntity>;
}
