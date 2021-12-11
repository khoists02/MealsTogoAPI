import { Schema, model } from "mongoose";
import { UsersRoles } from "../interfaces/roles.interface";

const usersRolesSchema = new Schema<UsersRoles>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

// tslint:disable-next-line: variable-name
export const UsersRolesModel = model<UsersRoles>("users_roles", usersRolesSchema);
