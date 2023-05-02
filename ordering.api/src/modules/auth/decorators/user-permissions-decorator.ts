import { SetMetadata } from "@nestjs/common";
import { UserPermissions } from "../enums/user-permissions";

export const PERMISSIONS_KEY = "permissions";

export function Permissions(permissions: UserPermissions) {
  return SetMetadata(PERMISSIONS_KEY, permissions);
}