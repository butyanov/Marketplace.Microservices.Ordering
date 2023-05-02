import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Order } from "./entities/order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports : [TypeOrmModule.forFeature([Order]),
    AuthModule
  ]
})
export class OrdersModule {}
