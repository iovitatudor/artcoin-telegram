import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/orders.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      return await this.orderRepository.save({ ...createOrderDto });
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      order: { id: "ASC" },
      relations: { product: { seller: true, category: true } }
    });
  }

  async findOne(id: number): Promise<Order> {
    try {
      return await this.orderRepository.findOneOrFail({
        where: { id },
        relations: { product: { seller: true, category: true } }
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any order.",
        HttpStatus.NOT_FOUND
      );
    }
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto
  ): Promise<UpdateResult> {
    try {
      return await this.orderRepository.update(id, updateOrderDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.orderRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
