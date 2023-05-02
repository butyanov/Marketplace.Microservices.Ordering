import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { PERMISSIONS_KEY } from "./decorators/user-permissions-decorator";
import { HttpService } from "@nestjs/axios";
import { UserPermissions } from "./enums/user-permissions";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private httpService: HttpService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const permissions = request["permissions"];
    if (!permissions)
      throw new ForbiddenException("No permissions was provided");
    
    const requiredPermissions = this.reflector.get<UserPermissions>(PERMISSIONS_KEY, context.getHandler());
    if (!requiredPermissions)
      throw new ForbiddenException("No permissions requirements was provided");
    
    if ((permissions & requiredPermissions) !== requiredPermissions)
      throw new ForbiddenException();
    
    return true;
  }
  
}