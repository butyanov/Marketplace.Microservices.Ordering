import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";
import * as https from "https";
import * as process from "process";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private httpService: HttpService) {
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException("No token was provided");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
    } catch (err) {
      if (err.name === "TokenExpiredError")
        throw new UnauthorizedException("Token expired");
      throw new UnauthorizedException("Token was not verified");
    }

    const userid = payload["nameid"];
    const permissions = payload["Permissions"];

    if (!userid || !permissions)
      throw new UnauthorizedException("Invalid token payload");

    if (!await this.getUserById(payload.nameId, token))
      throw new UnauthorizedException();
    
    request["userId"] = userid;
    request["permissions"] = permissions;

    return true;
  }

  private async getUserById(userId: string, token: string) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
    return await lastValueFrom(this.httpService
      .get(`https://localhost:7035/me/v1/get`, {
        httpsAgent,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .pipe(map((resp) => resp.data)));
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}