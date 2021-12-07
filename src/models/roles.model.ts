import { Schema, model } from 'mongoose';
import { RoleEntity, RoleModel } from '../interfaces/roles.interface';

const rolesSchema = new Schema<RoleEntity>({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
});

rolesSchema.statics.findByRoleName = function (name: string) {
  return this.findOne({ name });
};

// tslint:disable-next-line: variable-name
export const RolesModel = model<RoleEntity, RoleModel>('roles', rolesSchema);
