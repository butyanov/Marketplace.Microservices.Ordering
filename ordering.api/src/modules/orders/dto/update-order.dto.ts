import { OrderStatus } from "../enums/order-status";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";

export class UpdateOrderDto {
  @ApiProperty({ description: "Order status", nullable: false })
  @IsInt()
  @Min(0)
  @Max(3)
  status: OrderStatus;
}
