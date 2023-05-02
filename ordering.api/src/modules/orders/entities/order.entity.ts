import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enums/order-status";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ type: "uuid", nullable: false })
  userId: string;
  @CreateDateColumn()
  date: string;
  @Column({ type: "jsonb", nullable: false })
  products: { [name: string]: { quantity: number, price: number } };
  @Column("int8")
  status: OrderStatus;
  @Column({ type: "decimal", nullable: false })
  price: number;
  @Column()
  link: string;
}
