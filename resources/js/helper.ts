import { User } from "./types";

export const can = (user: User, permission: string) => {
  return user.permissions.includes(permission);
};

export const hasRole = (user: User, role: string) => {
  return user.roles.includes(role);
};
