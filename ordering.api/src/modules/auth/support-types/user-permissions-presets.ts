import { UserPermissions } from "../enums/user-permissions";

export const UserPermissionsPresets =
  {
    anon: UserPermissions.READ,
    user: UserPermissions.READ | UserPermissions.EDIT,
    moderator: UserPermissions.READ | UserPermissions.EDIT | UserPermissions.WRITE,
    admin: UserPermissions.READ | UserPermissions.EDIT | UserPermissions.WRITE | UserPermissions.DELETE,
    creator: Number.MAX_SAFE_INTEGER
  };