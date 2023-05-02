import { OrderStatus } from "../enums/order-status";
import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Min } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({ description: "Order user identifier", nullable: false })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
  @ApiProperty({ description: "Order products", nullable: false })
  @ArrayNotEmpty()
  products: { [name: string]: { quantity: number, price: number } };
  @ApiProperty({ description: "Order status", nullable: false })
  @IsInt()
  @Min(0)
  status: OrderStatus;
  @ApiProperty({ description: "Order price", nullable: false })
  @IsNumber()
  @IsPositive()
  price: number;
  @ApiProperty({ description: "Order product's url", nullable: false })
  @IsString()
  link: string;
}
