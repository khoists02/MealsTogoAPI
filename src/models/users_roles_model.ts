import { Schema, model } from 'mongoose';
import { UsersRoles } from '../interfaces/roles.interface';

const usersRolesSchema = new Schema<UsersRoles>({
  userId: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});

// tslint:disable-next-line: variable-name
export const UsersRolesModel = model<UsersRoles>('users_roles', usersRolesSchema);
