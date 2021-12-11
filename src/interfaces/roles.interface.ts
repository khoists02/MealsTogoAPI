import { Document, Model } from "mongoose";

export interface Role {
  name?: string;
}

export interface RoleEntity extends Document, Role {}

export interface RoleModel extends Model<RoleEntity> {
  findByRoleName: (role: string) => Promise<RoleEntity>;
}

export interface UsersRoles {
  userId?: string;
  roleId?: string;
}
