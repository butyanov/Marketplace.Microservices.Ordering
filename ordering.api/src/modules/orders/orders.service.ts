import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>
  ) {
  }

  async add(createUserDto: CreateOrderDto): Promise<Order> {
    const user = plainToClass(Order, createUserDto);
    return this.ordersRepository.save(user);
  }

  async findAll({ skip, take }) {
    return this.findAndCountOrders({
      take,
      skip
    });
  }

  async findRangeByUserId(userId: string, { skip, take }) {
    return this.findAndCountOrders({
      where: { userId: userId },
      take,
      skip
    });
  }

  async findOneById(id: string) {
    try {
      return await this.ordersRepository.findOneByOrFail({ id: id });
    } catch (Exception) {
      throw new NotFoundException(`Order with id '${id}' not found`);
    }
  }

  async updateStatus(id: string, orderStatus: number) {
    await this.findOneById(id);
    return await this.ordersRepository.update(id, { status: orderStatus });
  }

  async removeById(id: string) {
    await this.findOneById(id);
    return await this.ordersRepository.delete(id);
  }

  async removeRangeByUserId(userId: string) {
    return await this.ordersRepository.delete({ userId: userId });
  }

  private async findAndCountOrders(options: FindManyOptions<Order>) {
    const [orders, count] = await this.ordersRepository.findAndCount(options);
    const totalPages = Math.ceil(count / options.take);

    return {
      items: orders,
      meta: {
        totalItems: count,
        itemCount: orders.length,
        itemsPerPage: options.take,
        totalPages,
        currentPage: options.skip
      }
    };
  }
}
