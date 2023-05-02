import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { CustomValidationPipe } from "./Pipes/custom-validation.pipe";
import { HttpExceptionFilter } from "./Filters/http-exceptions.filter";
import { OrdersModule } from "./modules/orders/orders.module";
import { Order } from "./modules/orders/entities/order.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }],
  imports: [
    ConfigModule.forRoot(),
    OrdersModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5434,
      username: "postgresOrdering",
      password: "postgresOrdering",
      database: "postgresOrdering",
      entities: [Order],
      synchronize: true
    })]
})
export class AppModule {
}
