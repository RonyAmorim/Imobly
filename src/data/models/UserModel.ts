import { User, UserRole } from '@domain/entities/User';

export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export const UserMapper = {
  toEntity(model: UserModel): User {
    return {
      ...model,
      createdAt: new Date(model.createdAt),
    };
  },

  fromEntity(entity: User): UserModel {
    return {
      ...entity,
      createdAt: entity.createdAt.toISOString(),
    };
  },
};
