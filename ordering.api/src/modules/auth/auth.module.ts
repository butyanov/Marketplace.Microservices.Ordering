import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    })
  ], 
  exports:[
    HttpModule
  ]
})
export class AuthModule {
}
